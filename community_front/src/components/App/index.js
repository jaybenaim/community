import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./Navbar";
import Home from "./Home";
import CreateProfileForm from "./MyCommunity";
import Root from "../../apis/root";
import Map from "./Map";
import MyProfile from "./MyProfile";
import Axios from "axios";
import PutTest from "../PutTest";
import SearchPage from "./MyCommunity";

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
    loading: false
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
      price: this.state.itemPrice.itemPrice
    })
      .then(res => {
        this.setState({ displayItemForm: false });
        console.log("Item added");
      })
      .catch(err => {
        console.log(err);
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

        // console.log(this.state.allProfiles);
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
        console.log(profile.user);
        if (profile.user === Number(window.localStorage["id"])) {
          return profile;
        }
      })
    });
  };

  // this.setState({ userProfile: res.data, loading: false });

  // this.setState({ userProfile: this.state.userProfile });

  handle_login = (e, data) => {
    e.preventDefault();
    Axios.post("http://localhost:8000/authenticate/", data).then(res => {
      console.log(res.data);
      window.localStorage["token"] = res.data.token;
      window.localStorage["username"] = data.username;
      window.localStorage["id"] = res.data.id;
      console.log(window.localStorage["token"]);
    });
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    // Axios.post("http://localhost:8000/api-token-auth/", {
    Root.post("users/", data, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      window.localStorage["token"] = res.data.token;
      window.localStorage["username"] = data.username;
      window.localStorage["id"] = res.data.id;
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

  // getSearchQuery = query => {
  //   Root.get("items/").then(res => {
  //     let items = res.data;
  //     (items || []).map((item, i) => {
  //       // const { name_of_item, price, profile_id } = item;
  //       if (item.name_of_item.toLowerCase() === query.toLowerCase()) {
  //         this.setState({
  //           searchItem: { ...item },
  //           profileId: item.profile_id
  //         });
  //       }
  //       return item;
  //     });
  //   });
  //   this.setState({ loading: true });
  //   this.state.loading && this.getSearchProfile();
  // };

  // getSearchProfile = () => {
  //   const { profileId } = this.state;
  //   Root.get(`profiles/${profileId}/`).then(res => {
  //     this.setState({ profileSearched: res.data });
  //     console.log(res.data);
  //   });
  // };
  handleItem = (item, price) => {
    let newItems = [];
    newItems.push({ item, price });
    this.setState(prevState => ({ items: newItems }));

    setTimeout(() => {
      console.log(this.state.items);
    }, 1000);
  };

  componentDidMount() {
    this.getAllProfiles();
    this.getProfileId();
    // console.log(this.state.userProfile[0].id);
  }
  componentDidUpdate = () => {
    // this.getProfile(this.state.userProfile[0].id);
  };
  render() {
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
