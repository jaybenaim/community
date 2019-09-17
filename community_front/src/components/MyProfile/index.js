import React from "react";
import "./index.css";
import Root from "../../apis/root";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
// import ImageApi from "../../apis/images";
import {
  GIPHY_API_KEY
  // PEXELS_API_KEY,
  // IMAGE_ACCESS_KEY
} from "../../apis/keys";
import ProfileItem from "../ProfileItem";

import Axios from "axios";
import ItemForm from "../ItemForm";

class MyProfile extends React.Component {
  state = {
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

  // todo get all items related to user
  // getItems = () => {
  //   Root.get("items/").then(res => {
  //     const { name_of_item, price } = res.data[0];
  //     this.setState({
  //       query: name_of_item,
  //       itemName: name_of_item,
  //       itemPrice: price
  //     });
  //   });
  //   setTimeout(() => {
  //     this.setImages();
  //   }, 1000);
  // };

  getItems = () => {
    Root.get("items/").then(res => {
      let items = res.data;
      let newItems = [];
      let queries = [];
      (items || []).map((item, i) => {
        // const { name, price, profile_id } = item;

        // if (item.profile_id == this.props.profileId) {
        newItems.push(item);
        queries.push(item.name);
        this.setState(prevState => ({
          query: queries,
          items: newItems
        }));
        return item;
        // }
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
      `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${query}&limit=1&offset=0&rating=G&lang=en`
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
    // this.getItems();
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
          <Col xs={12} md={6} className="con">
            <section>
              <img
                className="profile-image"
                src={this.state.profileImage}
                alt="profile"
                onClick={this.get}
              />
              <p className="profile-name">
                Name: {this.props.profileSearched.profile_name}
              </p>
              <p className="profile-details">
                <Button
                  className="add-item-button"
                  variant="primary"
                  onClick={event => this.handleAddItem(event)}
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
              />
            </section>
          </Col>
          <Col className="profile-items">{itemElements}</Col>
        </Row>
      </Container>
    );
  }
}

export default MyProfile;
