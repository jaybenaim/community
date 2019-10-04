import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./Navbar";
import Home from "./Home";
import Root from "../../apis/root";
import Map from "./Map";
import MyProfile from "./MyProfile";
import Axios from "axios";
import SearchPage from "./MyCommunity";
import ChatWidget from "./ChatWidget";

class App extends React.Component {
  state = {
    user: [],
    userProfile: [],
    items: [],
    show: "false",
    showProfile: false,
    displayItemForm: false,
    itemName: "first name",
    itemPrice: "price",
    allProfiles: [],
    displayed_form: "",
    loggedIn: window.localStorage["token"] ? true : false,
    username: "",
    searchItem: null,
    profileSearched: "",
    navClass: "nav navbar-light",
    loading: false,
    chatShow: false
  };

  // Handlers
  handleNavClassChange = () => {
    this.setState({ navClass: "nav navbar-dark" });
  };
  handleAddItemName = event => {
    let itemName = event.target.value;
    this.setState({ itemName: itemName });
  };
  handleAddItemPrice = event => {
    let itemPrice = event.target.value;
    this.setState({ itemPrice: itemPrice });
  };

  handleItemFormSubmit = e => {
    e.preventDefault();
    Root.post("items/", {
      name_of_item: this.state.itemName.itemName,
      price: this.state.itemPrice.itemPrice,
      available: true
    })
      .then(res => {
        this.setState({ displayItemForm: false });
        console.log("Item added");
      })
      .catch(err => {
        alert("Error", err);
      });
  };

  handleAddItemToggle = event => {
    event.preventDefault();
    this.setState(prevState => !prevState);
  };

  handleProfileFormSubmit = values => {
    let name = values.profile_name;
    let email = values.email;
    let address = values.address;

    this.setState({ name, email, address });
  };

  handleShowProfile = () => {
    this.setState({ showProfile: true });
  };
  handleClose = () => {
    this.setState({ showProfile: true });
  };
  handleShow = () => {
    this.setState({ show: true });
  };

  getAllProfiles = () => {
    Root.get("profiles/", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        let profiles = res.data;
        this.setState({ allProfiles: profiles });
      })
      .then(res => {
        this.getProfileId();
      });
  };
  getAllItems = () => {
    return null;
  };
  getProfileId = () => {
    let profiles = this.state.allProfiles;

    this.setState({
      userProfile: profiles.filter(profile => {
        if (profile.user === Number(window.localStorage["id"])) {
          return profile;
        }
      })
    });
  };

  handle_login = (e, data) => {
    e.preventDefault();
    Axios.post("http://localhost:8000/authenticate/", data).then(res => {
      window.localStorage["token"] = res.data.token;
      window.localStorage["username"] = data.username;
      window.localStorage["id"] = res.data.id;
    });
    this.getProfileId();
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    Root.post("users/", data, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      window.localStorage["token"] = res.data.token;
      window.localStorage["username"] = data.username;
      window.localStorage["id"] = res.data.id;
      this.getProfileId();
    });
  };

  handle_logout = e => {
    e.preventDefault();
    window.localStorage["token"] = "";
    window.localStorage["username"] = "";
    window.localStorage["id"] = "";
    this.setState({ loggedIn: false });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  handleItem = (item, price) => {
    let newItems = [];
    newItems.push({ item, price });
    this.setState(prevState => ({ items: newItems }));
  };

  handleChatToggle = () => this.setState({ chatShow: !this.state.chatShow });

  componentDidMount() {
    this.getAllProfiles();
    this.getProfileId();
  }

  render() {
    const { userProfile, chatShow } = this.state;
    const chatWidget = (
      <ChatWidget userProfile={userProfile} chatShow={chatShow} />
    );
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
          <Switch>
            <NavBar
              loggedIn={this.state.loggedIn}
              display_form={this.display_form}
              handle_logout={this.handle_logout}
              username={this.state.username}
              displayed_form={this.state.displayed_form}
              handle_login={this.handle_login}
              handle_signup={this.handle_signup}
              getItems={this.getSearchQuery}
              getProfile={this.getSearchProfile}
              userProfile={this.state.userProfile}
              handleNavClassChange={this.handleNavClassChange}
              navClass={this.state.navClass}
            />
          </Switch>

          <Switch>
            <Route
              path="/profiles/search"
              render={props => (
                <SearchPage
                  loggedIn={this.state.loggedIn}
                  handleNavClassChange={this.handleNavClassChange}
                  handleItem={this.handleItem}
                  chatWidget={chatWidget}
                  handleChatToggle={this.handleChatToggle}
                  chatShow={chatShow}
                  userProfile={this.state.userProfile}
                />
              )}
            />
          </Switch>
          <Switch>
            <Route
              path="/map"
              render={props => (
                <Map
                  allProfiles={this.state.allProfiles}
                  handleNavClassChange={this.handleNavClassChange}
                />
              )}
            />
          </Switch>
          <Switch>
            <Route
              exact
              path="/profiles/myprofile"
              render={props => (
                <MyProfile
                  handleItem={this.handleItem}
                  userProfile={this.state.userProfile}
                  loggedIn={this.state.loggedIn}
                  handleNavClassChange={this.handleNavClassChange}
                  getProfileId={this.getProfileId}
                  chatWidget={chatWidget}
                  handleChatToggle={this.handleChatToggle}
                  chatShow={chatShow}
                  allProfiles={this.state.allProfiles}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
