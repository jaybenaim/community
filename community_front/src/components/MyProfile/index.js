import React from "react";
import "./index.css";
import Root from "../../apis/root";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ImageApi from "../../apis/images";
import IMAGE_ACCESS_KEY from "../../apis/keys";
import PEXELS_API_KEY from "../../apis/keys";
import GIPHY_API_KEY from "../../apis/keys";
import ProfileItem from "../ProfileItem";

import Axios from "axios";

class MyProfile extends React.Component {
  state = {
    items: [],
    image: "",
    query: ""
  };
  getToken = () => {
    Root.get(`token-auth/`).then(res => {
      const { data } = res;
      // data.map();
      // console.log(res.user);
    });
  };
  getImages = async () => {
    Root.get("items/").then(res => {
      const { name_of_item, price } = res.data[0];
      console.log(name_of_item);
      this.setState({ query: name_of_item });
    });
    await Axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${this.name_of_item}&limit=1&offset=0&rating=G&lang=en`
    )
      .then(res => {
        console.log(res.data.data[0].images.fixed_height_still);
        const { url } = res.data.data[0].images.fixed_height_still;
        this.setState({
          image: url
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getProfileName = () => {
    const { allProfiles } = this.props;
    allProfiles.map(profile => {
      console.log(profile);

      return profile;
    });
  };

  get = () => {
    fetch("http://localhost:8000/core/current_user/", {
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`
      }
    }).then(res => {
      console.log(res);
    });
  };

  render() {
    // this.getToken();
    // this.getImages();
    // this.getProfileName();
    this.get();
    return (
      <Container>
        <Row>
          <Col>
            <img
              className="profile-image"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              alt="profile"
              onClick={this.getImages}
            />
            <Container>
              <Row>
                <Col className="profile-name">Name: </Col>
              </Row>
            </Container>
          </Col>
          <ProfileItem />
          <Col className="myprofile-container">Item Details</Col>
        </Row>
      </Container>
    );
  }
}

export default MyProfile;
