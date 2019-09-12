import React, { useState } from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "../Navbar";
import Profile from "../Profile";
import Home from "../Home";
import SimpleMap from "../Map";
import Profiles from "../Profiles";
import Root from "../../apis/root";

const App = () => {
  // Hooks

  const [profileName, setProfileName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [show, setShow] = useState(false);
  const [showProfile, setProfile] = useState(false);
  const [displayItemForm, setDisplayItemForm] = useState(false);

  const [itemName, setItemName] = useState("first name");
  const [itemPrice, setItemPrice] = useState("price");

  const handleAddItemName = event => {
    let itemName = event.target.value;
    setItemName({ itemName: itemName });
  };
  const handleAddItemPrice = event => {
    let itemPrice = event.target.value;
    setItemPrice({ itemPrice: itemPrice });
  };

  const handleFormSubmit = () => {
    Root.post("items/", {
      name_of_item: itemName.itemName,
      price: itemPrice.itemPrice
    })
      .then(res => {
        console.log("Item added");
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Handlers
  const handleAddItemToggle = event => {
    event.preventDefault();
    setDisplayItemForm(prevState => !prevState);
  };

  const handleProfileFormSubmit = values => {
    let name = values.profile_name;
    let email = values.email;
    let address = values.address;

    setProfileName(name);
    setEmail(email);
    setAddress(address);
  };

  const handleShowProfile = () => {
    setProfile(true);
  };
  const handleClose = () => {
    setShow(false);
    setProfile(true);
  };
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
                showProfile={showProfile}
                itemName={itemName}
                itemPrice={itemPrice}
                handleShow={handleShow}
                handleClose={handleClose}
                handleAddItemName={handleAddItemName}
                handleAddItemPrice={handleAddItemPrice}
                handleAddItemToggle={handleAddItemToggle}
                handleShowProfile={handleShowProfile}
                handleProfileFormSubmit={handleProfileFormSubmit}
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

export default App;
