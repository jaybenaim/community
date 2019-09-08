import React, { useState } from "react";
import ProfileForm from "../../components/ProfileForm";
import axios from "axios";
import UserProfile from "../UserProfile";
import "./index.css";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const Profile = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [shedItem, setItem] = useState([]);
  const [shedItemPrice, setItemPrice] = useState("");
  const [show, setShow] = useState(false);
  // const [showProfile, setProfile] = useState(false);

  // const checkForProfile = () => {
  //   axios.get("/api").then(res => {
  //     console.log(username);
  //     let profile = res.data.profiles;
  //     console.log(res);
  //     for (let i = 0; i < profile.length; i++) {
  //       if (profile[i].username === username) {
  //         console.log("hello");
  //       }
  //     }
  //   });
  // };

  const handleProfileFormSubmit = event => {
    event.preventDefault();
    axios
      .post("/api", {
        username,
        email,
        address,
        shedItem,
        shedItemPrice
      })
      .then(res => {
        console.log(username, email, address, shedItem, shedItemPrice);
        console.log("POST Status: " + res.statusText);
        handleClose();
      })
      .catch(err => {
        console.log("POST Status: " + err);
      });
  };

  const handleNameChange = event => {
    setName(event.target.value);
  };
  const handleEmailChange = event => {
    setEmail(event.target.value);
  };
  const handleAddressChange = event => {
    setAddress(event.target.value);
  };
  const handleItemChange = event => {
    setItem(event.target.value);
  };
  const handleItemPriceChange = event => {
    setItemPrice(event.target.value);
  };
  // const handleShowProfile = () => {
  //   setProfile(true);
  // };

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="profile-page-container">
        {/* {showProfile ? ( */}
        <div className="profile-page">
          <UserProfile
            username={username}
            email={email}
            address={address}
            shedItem={shedItem}
            shedItemPrice={shedItemPrice}
            show={show}
          />
        </div>
        {/* ) : ( */}
        <div className="create-profile-button">
          <ProfileForm
            show={show}
            handleShow={handleShow}
            handleNameChange={handleNameChange}
            handleEmailChange={handleEmailChange}
            handleAddressChange={handleAddressChange}
            handleItemChange={handleItemChange}
            handleItemPriceChange={handleItemPriceChange}
            handleProfileFormSubmit={handleProfileFormSubmit}
          />
        </div>
        {/* )} */}
      </div>
    </>
  );
};

export default Profile;
