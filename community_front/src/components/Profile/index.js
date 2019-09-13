import React, { useState } from "react";
import ProfileForm from "../../components/ProfileForm";
import UserProfile from "../UserProfile";
import Root from "../../apis/root";
import "./index.css";
import Item from "../Item";

const Profile = ({
  profileName,
  email,
  address,
  show,
  showProfile,
  displayItemForm,
  itemName,
  itemPrice,
  handleShow,
  handleClose,
  handleAddItemName,
  handleAddItemPrice,
  handleAddItemToggle,
  handleShowProfile,
  handleProfileFormSubmit,
  handleFormSubmit
}) => {
  return (
    <>
      <div className="profile-page-container">
        <div className="profile-page">
          {/* <AllProfiles /> */}
          <UserProfile
            profileName={profileName}
            email={email}
            address={address}
            show={show}
            showProfile={showProfile}
            itemName={itemName}
            itemPrice={itemPrice}
          />
          {displayItemForm && (
            <Item
              profileName={profileName}
              email={email}
              address={address}
              show={show}
              handleClose={handleClose}
              handleAddItemName={handleAddItemName}
              handleAddItemPrice={handleAddItemPrice}
              handleFormSubmit={handleFormSubmit}
              displayItemForm={displayItemForm}
            />
          )}
        </div>
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
            handleAddItem={handleAddItemToggle}
            displayItemForm={displayItemForm}
          />
        </div>
      </div>
    </>
  );
};

export default Profile;
