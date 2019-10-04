import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Root from "../../../apis/root";
import "./index.css";

import { GIPHY_API_KEY } from "../../../apis/keys";
import axios from "axios";

class ProfileItem extends React.Component {
  state = {
    itemAvailable: this.props.available,
    isActive: this.props.available ? false : true,
    buttonClass: this.props.available ? "success" : "danger",
    buttonText: this.props.available ? "Item Available" : "Item Unavailable",
    image: null,
    loading: true
  };

  componentDidMount() {
    this.setHeroImage();
    console.log(localStorage['token'])
  }

  handleBorrowButton = () => {
    const { id, userProfileId, userProfile, currentUserProfile } = this.props;
    Root.patch(
      `items/${id}/`,
      {
        profile_id: userProfileId,
        user_who_borrowed: localStorage['id'],
        available: false
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${window.localStorage["token"]}`
        }
      }
    ).catch(err => {
      alert("Item Not Available");
    });
  };

  // Get a list of names in an array to pass each name as the query string
  // in the gify api
  setHeroImage = () => {
    const { name } = this.props;
    this.getGify(name);
  };

  // GIPHY API CALL
  getGify = async query => {
    await axios
      .get(
        `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${query}&limit=1&offset=0&rating=G&lang=en`
      )
      .then(res => {
        const image = res.data.data[0].images.fixed_height.url;
        const { url } = res.data.data[0].images.fixed_height_still;

        this.setState({ image: image || url, loading: false });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    // Show loading text when no image is ready
    if (this.state.loading) {
      return <Row>Loading ...</Row>;
    }

    return (
      // Image is ready
      <Row className="item-card">
        <div className="item-container">
          <Row className="item-square">
            <Col className="gif-container">
              <img className="item-image" src={this.state.image} alt="item" />
            </Col>

            <Col className="item-content item-name">
              <label htmlFor="item name">Item Name</label>
              <div> {this.props.name} </div>
            </Col>
            <Col className="item-content item-price">
              <label htmlFor="item price">Item Price</label>
              <div> {this.props.price}</div>
            </Col>

            <Button
              className="item-content borrow-button"
              variant={this.state.buttonClass}
              onClick={this.handleBorrowButton}
              disabled={this.state.isActive}
            >
              {this.state.buttonText}
            </Button>
          </Row>
        </div>
      </Row>
    );
  }
}

export default ProfileItem;
