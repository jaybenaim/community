import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "./index.css";
class ProfileItem extends React.Component {
  state = {};
  render() {
    return (
      <>
        <Row>
          <Col className="myprofile-container">
            <img className="item-image" src={this.props.image} alt="item" />
          </Col>
          <Col className="myprofile-container">{this.props.name}</Col>
          <label htmlFor="item-price">Item Price</label>
          <Col className="myprofile-container">
            {this.props.price}
            <Button className="myprofile-container">Click to borrow </Button>
          </Col>
        </Row>
      </>
    );
  }
}

export default ProfileItem;
