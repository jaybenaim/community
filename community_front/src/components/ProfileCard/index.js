import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./index.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class ProfileCard extends React.Component {
  state = {
    profiles: this.props.allProfiles,
    items: this.props.allItems
  };

  render() {
    const {
      profile_name,
      email,
      address,
      itemName,
      itemPrice,
      allItems
    } = this.props;
    return (
      <>
        <Container className="grid-container">
          <Row className="show-grid">
            <Col xs={12} md={4} lg={3}>
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                />
                <Card.Body>
                  <Card.Title>{profile_name}</Card.Title>
                  <Card.Text>
                    {email}
                    <br />
                    {address}
                  </Card.Text>
                  <Button variant="primary" onClick={allItems}>
                    Click to see more
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default ProfileCard;
