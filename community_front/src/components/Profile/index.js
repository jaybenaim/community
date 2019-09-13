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
  handleItemClose,
  handleAddItemToggle,
  handleShowProfile,
  handleProfileFormSubmit,
  handleFormSubmit,

  onChangeItemName,
  onChangeItemPrice
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
              itemName={itemName}
              itemPrice={itemPrice}
              handleItemClose={handleItemClose}
              onChangeItemPrice={onChangeItemPrice}
              onChangeItemName={onChangeItemName}
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
<<<<<<< HEAD
=======

        {/* )} */}
>>>>>>> 65347de3ab93e4bc5e2c4e5d134bb8c94fd0bb1b
      </div>
    </>
  );
};

export default Profile;
