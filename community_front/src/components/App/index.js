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

  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  const onChangeItemName = newName => {
    setItemName(newName);
  };
  const onChangeItemPrice = newPrice => {
    setItemPrice(newPrice);
  };

  const handleFormSubmit = () => {
    Root.post("items/", {
      name_of_item: itemName,
      price: itemPrice
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
  const handleAddItemToggle = event => {
    event.preventDefault();
    setDisplayItemForm(prevState => !prevState);
  };

  const handleItemClose = () => {
    setDisplayItemForm(false);
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

export default App;
