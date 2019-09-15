import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./index.css";
class ProfileItem extends React.Component {
  state = {};
  render() {
    return (
      <>
        <Row>
          <Col className="myprofile-container">
            Item Image
            <img className="item-image" src={this.props.image} alt="item" />
          </Col>
          <Col className="myprofile-container">Item Name</Col>
          <Col className="myprofile-container">Item Details</Col>
        </Row>
      </>
    );
  }
}

export default ProfileItem;
