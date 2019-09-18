import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "./index.css";

import {
  GIPHY_API_KEY
  // PEXELS_API_KEY,
  // IMAGE_ACCESS_KEY
} from "../../../apis/keys";
import Axios from "axios";

class ProfileItem extends React.Component {
  state = {
    itemAvailable: true,
    isActive: false,
    buttonClass: "success",
    image: null,
    loading: true
  };

  componentDidMount() {
    this.setHeroImage();
  }

  handleBorrow = () => {
    this.setState({
      itemAvailable: false,
      isActive: true,
      buttonClass: "danger"
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
    await Axios.get(
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
            <Col>
              <img className="item-image" src={this.state.image} alt="item" />
            </Col>
            <Col className="item-content item-name">{this.props.name}</Col>
            <Col className="item-content">{this.props.price}</Col>
            <Button
              className="item-content borrow-button"
              variant={this.state.buttonClass}
              onClick={this.handleBorrow}
              disabled={this.state.isActive}
            >
              Click to borrow{" "}
            </Button>
          </Row>
        </div>
      </Row>
    );
  }
}

export default ProfileItem;
