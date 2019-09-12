import React, { useState } from "react";
import ProfileForm from "../../components/ProfileForm";
import UserProfile from "../UserProfile";
import "./index.css";
import Item from "../Item";

const Profile = () => {
  // Hooks

  const [profileName, setProfileName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [show, setShow] = useState(false);
  const [showProfile, setProfile] = useState(false);
  const [displayItemForm, setDisplayItemForm] = useState(false);

  // Handlers
  const handleAddItem = event => {
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
          {displayItemForm && (
            <Item
              profileName={profileName}
              email={email}
              address={address}
              show={show}
              handleClose={handleClose}
              handleAddItem={handleAddItem}
            />
          )}
        </div>

        {/* ) : ( */}
        <div className="create-profile-button">
          <ProfileForm
            profileName={profileName}
            email={email}
            address={address}
            show={show}
            handleProfileFormSubmit={handleProfileFormSubmit}
            handleShowProfile={handleShowProfile}
            handleShow={handleShow}
            handleClose={handleClose}
            handleAddItem={handleAddItem}
          />
        </div>
        {/* )} */}
      </div>
    </>
  );
};

export default Profile;
