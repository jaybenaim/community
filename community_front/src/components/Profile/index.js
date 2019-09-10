import React, { useState } from "react";
import ProfileForm from "../../components/ProfileForm";
import UserProfile from "../UserProfile";
import "./index.css";
import Root from "../../apis/root";
import axios from "axios";

const Profile = () => {
  const [profileName, setProfileName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [show, setShow] = useState(false);
  const [showProfile, setProfile] = useState(false);

  const handleProfileFormSubmit = async values => {
    let name = values.profileName;
    let email = values.email;
    let address = values.address;
    setProfileName(name);
    setEmail(email);
    setAddress(address);

    await Root.post("profiles/", {
      profileName,
      email,
      address
    })
      .then(res => {
        console.log(profileName + email + address);
        console.log("POST Status: " + res.statusText);
      })
      .catch(err => {
        console.log("POST Status: " + err);
      });
  };

  const onProfileFormSubmit = values => {
    let name = values.profileName;
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
  };
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="profile-page-container">
        {/* {showProfile ? ( */}
        <div className="profile-page">
          <UserProfile
            profileName={profileName}
            email={email}
            address={address}
            show={show}
            showProfile={showProfile}
          />
        </div>
        {/* ) : ( */}
        <div className="create-profile-button">
          <ProfileForm
            show={show}
            onProfileFormSubmit={onProfileFormSubmit}
            handleProfileFormSubmit={handleProfileFormSubmit}
            handleShowProfile={handleShowProfile}
            handleShow={handleShow}
            handleClose={handleClose}
          />
        </div>
        {/* )} */}
      </div>
    </>
  );
};

export default Profile;
