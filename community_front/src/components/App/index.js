import React, { useState } from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "../Navbar";
import Profile from "../Profile";
import Home from "../Home";
import SimpleMap from "../Map";
import AllProfiles from "../AllProfiles";
import Root from "../../apis/root";

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
    allProfiles: []
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
      console.log(this.state.allProfiles);
    });
  };
  getAllItems = () => {
    return null;
  };
  componentDidMount() {
    this.getAllProfiles();
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
          <Switch>
            <NavBar />
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
            <Route path="/map" component={SimpleMap} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
