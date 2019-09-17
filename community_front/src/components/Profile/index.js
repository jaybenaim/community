import React from "react";
import ProfileForm from "../../components/ProfileForm";
import UserProfile from "../UserProfile";
import "./index.css";

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
          {/* <CreateProfileForm /> */}
          <UserProfile
            profileName={profileName}
            email={email}
            address={address}
            show={show}
            showProfile={showProfile}
            itemName={itemName}
            itemPrice={itemPrice}
          />
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
