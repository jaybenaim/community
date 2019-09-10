import React, { useState } from "react";
import ProfileForm from "../../components/ProfileForm";
import UserProfile from "../UserProfile";
import "./index.css";
import Root from "../../apis/root";
import axios from "axios";

const Profile = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [shedItem, setItem] = useState([]);
  const [shedItemPrice, setItemPrice] = useState("");
  const [show, setShow] = useState(false);
  const [showProfile, setProfile] = useState(false);

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

    Root.post("/api/profiles", {
      username,
      email,
      address,
      shedItem,
      shedItemPrice
    })
      .then(res => {
        console.log("POST Status: " + res.statusText);
        handleClose();
        handleShowProfile();
        addItems();
      })
      .catch(err => {
        console.log("POST Status: " + err);
      });
  };
  const addItems = async () => {
    await axios.get("/api/profiles").then(res => {
      let profiles = res.data.profiles;
      let user = "";
      for (let i = 0; i < profiles.length; i++) {
        if (profiles[i].profile_name === username) {
          user = profiles[i].profile_name;
        } else console.log("user not found ");
      }
      Root.post("/api/profiles/add_items", {
        user,
        shedItem,
        shedItemPrice
      }).then(res => {
        console.log("items added");
      });
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
  const handleShowProfile = () => {
    setProfile(true);
  };

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
            showProfile={showProfile}
            handleClose={handleClose}
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
