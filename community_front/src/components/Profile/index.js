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
  // // Hooks

  // const [profileName, setProfileName] = useState("");
  // const [email, setEmail] = useState("");
  // const [address, setAddress] = useState("");
  // const [show, setShow] = useState(false);
  // const [showProfile, setProfile] = useState(false);
  // const [displayItemForm, setDisplayItemForm] = useState(false);
  // const [itemName, setItemName] = useState("first name");
  // const [itemPrice, setItemPrice] = useState("price");

  // const handleAddItemName = event => {
  //   let itemName = event.target.value;
  //   setItemName({ itemName: itemName });
  // };
  // const handleAddItemPrice = event => {
  //   let itemPrice = event.target.value;
  //   setItemPrice({ itemPrice: itemPrice });
  // };

  // const handleFormSubmit = () => {
  //   Root.post("items/", {
  //     name_of_item: itemName.itemName,
  //     price: itemPrice.itemPrice
  //   })
  //     .then(res => {
  //       console.log("Item added");
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  // // Handlers
  // const handleAddItemToggle = event => {
  //   event.preventDefault();
  //   setDisplayItemForm(prevState => !prevState);
  // };

  // const handleProfileFormSubmit = values => {
  //   let name = values.profile_name;
  //   let email = values.email;
  //   let address = values.address;

  //   setProfileName(name);
  //   setEmail(email);
  //   setAddress(address);
  // };

  // const handleShowProfile = () => {
  //   setProfile(true);
  // };
  // const handleClose = () => {
  //   setShow(false);
  //   setProfile(true);
  // };
  // const handleShow = () => setShow(true);
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
            handleAddItem={handleAddItemToggle}
          />
        </div>

        {/* )} */}
      </div>
    </>
  );
};

export default Profile;
