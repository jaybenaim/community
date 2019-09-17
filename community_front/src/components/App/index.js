import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "../Navbar";
import Home from "../Home";
import CreateProfileForm from "../CreateProfileForm";
import Root from "../../apis/root";
import SimpleMap from "../SimpleMap";
import MyProfile from "../MyProfile";
import Axios from "axios";
import PutTest from "../PutTest";

class App extends React.Component {
  state = {
    userProfile: [],
    items: [],
    profileName: "",
    profileId: null,
    email: "",
    address: "",
    show: "false",
    showProfile: false,
    displayItemForm: false,
    itemName: "first name",
    itemPrice: "price",
    allProfiles: [],
    displayed_form: "",
    logged_in: localStorage.getItem("token") ? true : false,
    username: "",
    searchItem: null,
    profileSearched: "",
    loading: false
  };

  // Handlers
  handleAddItemName = event => {
    let itemName = event.target.value;
    this.setState({ itemName: itemName });
  };
  handleAddItemPrice = event => {
    let itemPrice = event.target.value;
    this.setState({ itemPrice: itemPrice });
  };

  handleItemFormSubmit = () => {
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

  getCreateProfileForm = () => {
    Root.get("profiles/").then(res => {
      let profiles = res.data;
      this.setState({ allProfiles: profiles });
      // console.log(this.state.allProfiles);
    });
  };
  getAllItems = () => {
    return null;
  };

  componentDidMount() {
    this.getCreateProfileForm();
    this.getProfileFromToken();
  }

  handle_login = (e, data) => {
    e.preventDefault();
    Axios.post("http://localhost:8000/api-token-auth/", data)
      .then(res => {
        window.localStorage["token"] = res.data.token;
        window.localStorage["username"] = data.username;
      })
      .then(res => {
        setTimeout(() => {
          this.getProfileFromToken();
        }, 2000);
      });
  };

  getProfileFromToken = () => {
    Root.get("profiles/").then(res => {
      let profiles = res.data;
      let matchedProfile = [];

      profiles.map(profile => {
        console.log(profile.user);
        console.log(
          ` Profile: ${profile.username}` +
            `Storage: ${window.localStorage["username"]}`
        );
        if (
          profile.username.toLowerCase() ===
          window.localStorage["username"].toLowerCase()
        ) {
          matchedProfile.push(profile);
          console.log("profile set");
        }
      });
      this.setState({
        userProfile: matchedProfile,
        username: window.localStorage["username"],
        profileId: res.data,
        logged_in: true,
        displayed_form: ""
      });
      // console.log(this.state.userProfile.username);
    });
  };
  handle_signup = (e, data) => {
    e.preventDefault();
    // Axios.post("http://localhost:8000/api-token-auth/", {
    Root.post("users/", data, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        window.localStorage["token"] = res.data.token;
        window.localStorage["username"] = data.username;
      })
      .then(res => {
        setTimeout(() => {
          this.getProfileFromToken();
        }, 1000);
      });
  };

  handle_logout = () => {
    window.localStorage["token"] = "";
    window.localStorage["username"] = "";
    this.setState({ logged_in: false, username: "" });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  getSearchQuery = query => {
    Root.get("items/").then(res => {
      let items = res.data;
      (items || []).map((item, i) => {
        // const { name_of_item, price, profile_id } = item;
        if (item.name_of_item.toLowerCase() === query.toLowerCase()) {
          this.setState({
            searchItem: { ...item },
            profileId: item.profile_id
          });
        }
        return item;
      });
    });
    this.setState({ loading: true });
    this.state.loading && this.getSearchProfile();
  };

  getSearchProfile = () => {
    const { profileId } = this.state;
    Root.get(`profiles/${profileId}/`).then(res => {
      this.setState({ profileSearched: res.data });
      console.log(res.data);
    });
  };
  handleItem = (item, price) => {
    let newItems = [];
    newItems.push({ item, price });
    this.setState(prevState => ({ items: newItems }));

    setTimeout(() => {
      console.log(this.state.items);
    }, 1000);
  };

  render() {
    // this.getProfileFromToken();

    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
          <Switch>
            <NavBar
              logged_in={this.state.logged_in}
              display_form={this.display_form}
              handle_logout={this.handle_logout}
              username={this.state.username}
              displayed_form={this.state.displayed_form}
              handle_login={this.handle_login}
              handle_signup={this.handle_signup}
              getItems={this.getSearchQuery}
              getProfile={this.getSearchProfile}
              userProfile={this.state.userProfile}
            />
          </Switch>
          <Switch>
            <Route exact path="/puttest" component={PutTest} />
          </Switch>
          <Switch>
            <Route
              path="/users/profiles/"
              render={props => (
                <CreateProfileForm
                  allProfiles={this.state.allProfiles}
                  allItems={this.allItems}
                  handleProfileFormSubmit={this.handleProfileFormSubmit}
                  handleFormSubmit={this.handleFormSubmit}
                  handleShow={this.handleShow}
                  handleClose={this.handleClose}
                  show={this.show}
                  handleProfileFormClick={this.handleProfileFormClick}
                  username={this.state.username}
                  userProfile={this.state.userProfile}
                  profileId={this.state.profileId}
                  getProfileFromToken={this.getProfileFromToken}
                />
              )}
            />
          </Switch>
          <Switch>
            <Route
              path="/map"
              render={props => (
                <SimpleMap allProfiles={this.state.allProfiles} />
              )}
            />
          </Switch>
          <Switch>
            <Route
              exact
              path="/profiles/"
              render={props => (
                <MyProfile
                  allProfiles={this.state.allProfiles}
                  profileId={this.state.profileId}
                  profileSearched={this.state.profileSearched}
                  itemName={this.state.itemName}
                  itemPrice={this.state.itemPrice}
                  handleItemCLose={this.handleItemClose}
                  handleItem={this.handleItem}
                  userProfile={this.state.userProfile}
                  getProfileFromToken={this.getProfileFromToken}
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
