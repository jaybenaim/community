import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "../Navbar";
import Profile from "../Profile";
import Home from "../Home";
import AllProfiles from "../AllProfiles";
import Root from "../../apis/root";
import SimpleMap from "../SimpleMap";
import MyProfile from "../MyProfile";
import Nav from "../Registration/Nav";
import LoginForm from "../Registration/LoginForm";
import SignupForm from "../Registration/SignupForm";
import Row from "react-bootstrap/Row";

class App extends React.Component {
  state = {
    profileName: "",
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
    username: ""
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

  handleFormSubmit = () => {
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
    this.getAllProfiles();
    if (this.state.logged_in) {
      fetch("http://localhost:8000/core/current_user/", {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username });
        });
    }
  }

  handle_login = (e, data) => {
    e.preventDefault();
    fetch("http://localhost:8000/token-auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem("token", json.token);
        this.setState({
          logged_in: true,
          displayed_form: "",
          username: json.user.username
        });
      });
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch("http://localhost:8000/core/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem("token", json.token);
        this.setState({
          logged_in: true,
          displayed_form: "",
          username: json.username
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem("token");
    this.setState({ logged_in: false, username: "" });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
          {/* <Switch>
            <NavBar />
          </Switch> */}
          <Switch>
            <Route
              path="/nav"
              render={props => (
                <Nav
                  logged_in={this.state.logged_in}
                  display_form={this.display_form}
                  handle_logout={this.handle_logout}
                  username={this.state.username}
                />
              )}
            />
          </Switch>
          <Switch>
            <Route
              path="/users/profiles/"
              render={props => (
                <AllProfiles
                  allProfiles={this.state.allProfiles}
                  allItems={this.allItems}
                  handleProfileFormSubmit={this.handleProfileFormSubmit}
                  handleFormSubmit={this.handleFormSubmit}
                  handleShow={this.handleShow}
                  handleClose={this.handleClose}
                  show={this.show}
                  handleProfileFormClick={this.handleProfileFormClick}
                />
              )}
            />
          </Switch>
          <Switch>
            <Route
              exact
              path="/profiles"
              render={props => (
                <Profile
                  profileName={this.profileName}
                  email={this.email}
                  address={this.address}
                  show={this.show}
                  showProfile={this.showProfile}
                  itemName={this.itemName}
                  itemPrice={this.itemPrice}
                  displayItemForm={this.displayItemForm}
                  handleShow={this.handleShow}
                  handleClose={this.handleClose}
                  handleAddItemName={this.handleAddItemName}
                  handleAddItemPrice={this.handleAddItemPrice}
                  handleAddItemToggle={this.handleAddItemToggle}
                  handleShowProfile={this.handleShowProfile}
                  handleProfileFormSubmit={this.handleProfileFormSubmit}
                  handleFormSubmit={this.handleFormSubmit}
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
              path="/myprofile"
              render={props => (
                <MyProfile allProfiles={this.state.allProfiles} />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
