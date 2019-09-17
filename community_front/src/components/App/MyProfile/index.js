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
import ItemForm from "./ItemForm";

class MyProfile extends React.Component {
  state = {
    user: [],
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
    profile_id: this.props.profileId
  };

  getProfile = () => {
    // const { id } = this.props.userProfile[0];
    // Root.get(`profiles/${id}/`).then(res => {
    //   console.log(res.data);
    //   this.setState({ user: res.data });
    // });
    this.setState({ user: this.props.userProfile[0] });
  };
  getItems = () => {
    console.log(this.state.user);
    const {
      user,
      id: profileId,
      username,
      profile_name: profileName,
      email,
      address
    } = this.props.userProfile[0];

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

  componentDidMount = () => {
    // this.props.getProfileFromToken();

    setTimeout(() => {
      this.getProfile();
      // this.getItems();
    }, 1500);
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
    return (
      <Container>
        <Row>
          <Col xs={12} md={12} className="con">
            <section>
              <img
                className="profile-image"
                src={this.state.profileImage}
                alt="profile"
                onClick={this.get}
              />

              <p className="profile-details">
                <Row>
                  <p className="profile-name">
                    {/* Name: {this.props.profileSearched.profile_name} */}
                    <span className="bold"> Name:</span>{" "}
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
                  onClick={event => this.props.handleItem(event)}
                >
                  Add Item
                </Button>
              </p>
              <ItemForm
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
            </section>
          </Col>
          <Col xs={12} md={12} lg={6} className="profile-items">
            {itemElements}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MyProfile;
