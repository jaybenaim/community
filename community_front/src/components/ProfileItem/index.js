import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "./index.css";
class ProfileItem extends React.Component {
  state = {};
  render() {
    return (
      <>
        <Row className="item-card">
          <div className="item-container">
            <Container>
              <Row className="item-square">
                <Col>
                  <img
                    className="item-image"
                    src={this.props.image}
                    alt="item"
                  />
                </Col>
                <Col className="item-content item-name">{this.props.name}</Col>
                <Col className="item-content">{this.props.price}</Col>
                <Button className="item-content borrow-button">
                  Click to borrow{" "}
                </Button>
              </Row>
            </Container>
          </div>
        </Row>
      </>
    );
  }
}

export default ProfileItem;
