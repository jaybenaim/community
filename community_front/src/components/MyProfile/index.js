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
    profileImage:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    itemImages: [],
    query: "",
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  };
  getToken = () => {
    Root.get(`token-auth/`).then(res => {
      const { data } = res;
      // data.map();
      // console.log(res.user);
    });
  };
  getImages = () => {
    Root.get("items/").then(res => {
      const { name_of_item, price } = res.data[0];
      console.log(name_of_item);
      this.setState({ query: name_of_item });
    });
    // this.setImages();
  };
  setImages = async () => {
    const src = this.getImages();
    console.log("query" + this.state.query);
    await Axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${this.state.query}&limit=1&offset=0&rating=G&lang=en`
    )
      // await Axios.get(`https://api.pexels.com/v1/curated?per_page=1&page=1`, {
      //   headers: { Authorization: PEXELS_API_KEY }
      // })
      // await Axios.get(`https://api.pexels.com/v1/curated?per_page=1&page=1`, {
      //   headers: { Authorization: PEXELS_API_KEY }
      // })

      .then(res => {
        // console.log(res.data.data[0].images.fixed_height_still);
        const { url } = res.data.data[0].images.fixed_height_still;
        this.setState({
          image: url
        });
        this.setState(prevstate => ({
          itemImages: url
        }));
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

  render() {
    // this.getToken();
    // this.getImages();
    // this.getProfileName();

    return (
      <Container>
        <Row>
          <Col>
            <img
              className="profile-image"
              src={this.state.profileImage}
              alt="profile"
              onClick={this.setImages}
            />
            <Row className="profile-name">Name: </Row>
            <Row className="profile-details"> Profile Details </Row>
          </Col>

          <Col>
            <ProfileItem image={this.state.itemImages} />{" "}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MyProfile;
