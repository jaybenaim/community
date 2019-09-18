import React from "react";
import "./index.css";
import Root from "../../../apis/root";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
// import ImageApi from "../../apis/images";
import {
  GIPHY_API_KEY
  // PEXELS_API_KEY,
  // IMAGE_ACCESS_KEY
} from "../../../apis/keys";
import ProfileItem from "./ProfileItem";

import Axios from "axios";
import Item from "./ItemForm";
import CreateProfileForm from "./CreateProfileForm";
import EditProfile from "../../EditProfile";

class MyProfile extends React.Component {
  state = {
    user: null,
    items: [
      {
        image: null,
        itemGif: null,
        name: null,
        price: null,
        profile_id: null,
        id: null
      }
    ],
    urls: [],
    profileImage:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    itemGif: "",
    query: [],
    query2: "",
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    itemName: "",
    itemPrice: "",
    profile_id: this.props.profileId,
    showEditForm: false,
    showAddItemForm: false
  };

  getProfile = () => {
    if (this.props.userProfile[0] !== undefined)
      this.setState({ user: this.props.userProfile[0] });
  };

  getItemsFromUser = () => {
    const { user } = this.state;
    const { userProfile } = this.props;
    let newItems = [];
    let queries = [];
    Root.get("items/").then(res => {
      let items = res.data;
      items.map((item, i) => {
        if (userProfile[0] !== undefined) {
          if (item.profile_id === userProfile[0].id) {
            newItems.push(item);
            queries.push(item.name);
            this.setState(prevState => ({
              query: queries,
              items: newItems
            }));
            setTimeout(() => {
              this.setImages(item.name);
            }, 1000);
          }
        }
        return item;
      });
    });
  };
  getItems = () => {
    const { profileId } = this.state.user;

    Root.get("items/").then(res => {
      let items = res.data;
      let newItems = [];
      let queries = [];
      // displays empty box if no item is in profile
      (items || []).map((item, i) => {
        // const { name, price, profile_id } = item;
        console.log(item.profile_id + " = " + profileId);
        if (item.profile_id === profileId) {
          newItems.push(item);
          queries.push(item.name);
          this.setState(prevState => ({
            query: queries,
            items: newItems
          }));
          return item;
        }
      });
    });
    setTimeout(() => {
      const items = this.state.items;
      items.forEach(item => {
        this.setImages(item.name);
      });
    }, 1000);
  };
  setImages = async query => {
    await Axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=ladder&limit=1&offset=0&rating=G&lang=en`
    )
      // await Axios.get(`https://api.pexels.com/v1/curated?per_page=1&page=1`, {
      //   headers: { Authorization: PEXELS_API_KEY }
      // })
      // await Axios.get(`https://api.pexels.com/v1/curated?per_page=1&page=1`, {
      //   headers: { Authorization: PEXELS_API_KEY }
      // })

      .then(res => {
        let img = res.data.data[0].images.fixed_height.url;
        const { url } = res.data.data[0].images.fixed_height_still;

        let urls = [];
        urls.push(img);
        this.setState(prevState => ({
          image: url,
          itemGif: img,
          urls: urls
        }));
      })
      .catch(err => {
        console.log(err);
      });
  };

  changeImage = () => {
    let url = prompt("Enter a url");
    this.setState({ profileImage: url });
  };
  componentDidMount = () => {
    // this.props.getProfileFromToken();

    setTimeout(() => {
      this.getProfile();
    }, 1000);

    setTimeout(() => {
      this.getItemsFromUser();
    }, 1500);
  };

  toggleEditForm = e => {
    e.preventDefault();
    console.log("clicked");
    if (this.state.showEditForm === false) {
      return this.setState({ showEditForm: true });
    }
    return this.setState({ showEditForm: false });
  };

  toggleAddItemForm = event => {
    event.preventDefault();
    console.log("Add Item Form Clicked!");
    if (this.state.showEditForm === false) {
      return this.setState({ showAddItemForm: !this.state.showAddItemForm });
    }
    return this.setState({ showAddItemForm: !this.state.showAddItemForm });
  };

  render() {
    const { items, itemGif, image } = this.state;

    let itemElements = items.map((item, i) => {
      const { name_of_item, price } = item;

      return (
        <ProfileItem
          key={i}
          image={itemGif || image}
          name={name_of_item}
          price={price}
        />
      );
    });
    let createProfileForm;
    let profile;
    {
      this.state.user === null
        ? (createProfileForm = (
            <CreateProfileForm
              loadProfile={this.props.getProfileFromToken}
              userProfile={this.props.userProfile}
              getProfile={this.getProfile}
            />
          ))
        : (profile = (
            <Container>
              <Button
                className="edit-profile-button"
                variant="primary"
                onClick={this.toggleEditForm}
              >
                          Edit Profile         
              </Button>
                      
              {/*
          
                          When Show Edit Form is false, this will not show on the page
                          When the toggleShowEditForm is clicked it will update the value of
                          showEditForm. if the value is false, it will hide the component
                          if the value is true it will show the form
                        */}
                      
              {this.state.showEditForm && (
                <EditProfile toggleEditForm={this.toggleEditForm} />
              )}
              <Row>
                <Col xs={12} md={12} lg={4} className="con">
                  <section>
                    <img
                      className="profile-image"
                      src={this.state.profileImage}
                      alt="profile"
                      onClick={this.changeImage}
                    />

                    <div className="profile-details">
                      <Row>
                        <p className="profile-name">
                          {/* if searchActive &&  */}
                          {/* Name: {this.props.profileSearched.profile_name} */}
                          {this.state.user.profile_name}
                        </p>
                      </Row>
                      <br />
                      <Row>
                        <p className="profile-email">
                          <span className="bold"> Email:</span>{" "}
                          {this.state.user.email}
                        </p>
                        <br />
                      </Row>
                      <Row>
                        <p className="profile-address">
                          <br />
                          <span className="bold"> Address: </span>
                          {this.state.user.address}
                        </p>
                      </Row>

                      <Button
                        className="add-item-button"
                        variant="primary"
                        onClick={this.toggleAddItemForm}
                      >
                        Add Item
                      </Button>
                    </div>
                    {this.state.showAddItemForm && (
                      <Item
                        toggleAddItemForm={this.toggleAddItemForm}
                        itemName={this.state.itemName}
                        itemPrice={this.state.itemPrice}
                        handleItemClose={this.handleItemClose}
                        onChangeItemPrice={this.onChangeItemPrice}
                        onChangeItemName={this.onChangeItemName}
                        handleFormSubmit={this.handleFormSubmit}
                        displayItemForm={this.displayItemForm}
                        handleItem={this.props.handleItem}
                        userProfile={this.props.userProfile}
                      />
                    )}
                  </section>
                </Col>
                <Col xs={12} md={12} lg={6} className="profile-items">
                  {itemElements}
                </Col>
              </Row>
            </Container>
          ));
    }

    return (
      <>
        <div>
          {createProfileForm}
          {profile}
        </div>
      </>
    );
  }
}

export default MyProfile;
