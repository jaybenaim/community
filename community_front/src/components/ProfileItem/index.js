import React from "react";
import Col from "react-bootstrap/Col";

class ProfileItem extends React.Component {
  state = {};
  render() {
    return (
      <Col className="myprofile-container">
        Item Image
        <img src={this.state.image} alt="item" />
      </Col>
    );
  }
}

export default ProfileItem;
