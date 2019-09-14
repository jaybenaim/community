import React from "react";
import "./index.css";
import Root from "../../apis/root";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
class MyProfile extends React.Component {
  state = {
    items: []
  };
  getToken = () => {
    Root.get("profiles/").then(res => {
      const { data } = res;
      // data.map();
      console.log(res.user);
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
    this.getToken();
    // this.getProfileName();

    return (
      <Container>
        <Row>
          <Col>
            <img
              className="profile-image"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              alt="profile"
            />
            <Container>
              <Row>
                <Col className="profile-name">Name: </Col>
              </Row>
            </Container>
          </Col>
          <Col className="myprofile-container">Item Image</Col>
          <Col className="myprofile-container">Item Details</Col>
        </Row>
      </Container>
    );
  }
}

export default MyProfile;
