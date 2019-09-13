import React, { useState } from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "../Navbar";
import Profile from "../Profile";
import Home from "../Home";
import SimpleMap from "../Map";
import AllProfiles from "../AllProfiles";
import Root from "../../apis/root";

<<<<<<< HEAD
class App extends React.Component {
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
=======
const App = () => {
  // Hooks

  const [profileName, setProfileName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [show, setShow] = useState(false);
  const [showProfile, setProfile] = useState(false);
  const [displayItemForm, setDisplayItemForm] = useState(false);

  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  const onChangeItemName = newName => {
    setItemName(newName);
  };
  const onChangeItemPrice = newPrice => {
    setItemPrice(newPrice);
>>>>>>> 65347de3ab93e4bc5e2c4e5d134bb8c94fd0bb1b
  };

  handleFormSubmit = () => {
    Root.post("items/", {
<<<<<<< HEAD
      name_of_item: this.state.itemName.itemName,
      price: this.state.itemPrice.itemPrice
=======
      name_of_item: itemName,
      price: itemPrice
>>>>>>> 65347de3ab93e4bc5e2c4e5d134bb8c94fd0bb1b
    })
      .then(res => {
        setDisplayItemForm(false);
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

<<<<<<< HEAD
  handleProfileFormSubmit = values => {
=======
  const handleItemClose = () => {
    setDisplayItemForm(false);
  };

  const handleProfileFormSubmit = values => {
>>>>>>> 65347de3ab93e4bc5e2c4e5d134bb8c94fd0bb1b
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
  handleShow = () => this.setState({ handleShow: true });

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
<<<<<<< HEAD
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
=======
  const handleShow = () => setShow(true);

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
            exact
            path="/profiles"
            render={props => (
              <Profile
                profileName={profileName}
                email={email}
                address={address}
                show={show}
                displayItemForm={displayItemForm}
                showProfile={showProfile}
                itemName={itemName}
                itemPrice={itemPrice}
                displayItemForm={displayItemForm}
                handleShow={handleShow}
                handleClose={handleClose}
                handleItemClose={handleItemClose}
                onChangeItemName={onChangeItemName}
                handleFormSubmit={handleFormSubmit}
                onChangeItemPrice={onChangeItemPrice}
                handleAddItemToggle={handleAddItemToggle}
                handleShowProfile={handleShowProfile}
                handleProfileFormSubmit={handleProfileFormSubmit}
                handleFormSubmit={handleFormSubmit}
              />
            )}
          />
        </Switch>
        <Switch>
          <Route path="/all" component={Profiles} />
        </Switch>
        <Switch>
          <Route path="/map" component={SimpleMap} />
        </Switch>
      </div>
    </Router>
  );
};
>>>>>>> 65347de3ab93e4bc5e2c4e5d134bb8c94fd0bb1b

export default App;
