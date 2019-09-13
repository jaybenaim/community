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
  // Hooks

  // const [profileName, setProfileName] = useState("");
  // const [email, setEmail] = useState("");
  // const [address, setAddress] = useState("");
  // const [show, setShow] = useState(false);
  // const [showProfile, setProfile] = useState(false);
  // const [displayItemForm, setDisplayItemForm] = useState(false);
  // const [itemName, setItemName] = useState("first name");
  // const [itemPrice, setItemPrice] = useState("price");
  // const [allProfiles, setAllProfiles] = useState([]);
  state = {
    profileName: "",
    email: "",
    address: "",
    show: "",
    showProfile: false,
    displayItemForm: false,
    itemName: "first name",
    itemPrice: "price",
    allProfiles: []
  };
  handleAddItemName = event => {
    let itemName = event.target.value;
    // setItemName({ itemName: itemName });
    this.setState({ itemName: itemName });
  };
  handleAddItemPrice = event => {
    let itemPrice = event.target.value;
    // setItemPrice({ itemPrice: itemPrice });
    this.setState({ itemPrice: itemPrice });
  };

  handleFormSubmit = () => {
    Root.post("items/", {
      name_of_item: this.state.itemName.itemName,
      price: this.state.itemPrice.itemPrice
    })
      .then(res => {
        console.log("Item added");
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Handlers
  handleAddItemToggle = event => {
    event.preventDefault();
    this.setState(prevState => !prevState);
  };

  handleProfileFormSubmit = values => {
    let name = values.profile_name;
    let email = values.email;
    let address = values.address;

    this.setState({ name });
    this.setState({ email });
    this.setState({ address });
  };

  handleShowProfile = () => {
    this.setState({ showProfile: true });
  };
  handleClose = () => {
    this.setState({ showProfile: true });
  };
  handleShow = () => this.setState({ handleShow: true });

  getAllProfiles = () => {
    Root.get("profiles/").then(res => {
      let profiles = res.data;
      this.setState({ allProfiles: profiles });
      console.log(this.state.allProfiles);
    });
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
                <AllProfiles allProfiles={this.state.allProfiles} />
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
