import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./index.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

class ProfileCard extends React.Component {
  state = {
    profile: this.props.profile || [],
    profiles: this.props.allProfiles,
    items: this.props.allItems
  };

  checkIfProfileHasBeenSearchedFor = () => {
    if (this.props.loaded) {
      return this.setState({ profile: this.props.profile });
    } else {
      return this.setState({
        profile: "Profile Name",
        email: "Email",
        address: "Address"
      });
    }
  };

  render() {
    // this.checkIfProfileHasBeenSearchedFor();

    const { profileName, email, address } = this.state.profile;

    return (
      <>
        {!this.props.loaded ? (
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              ref={this.props.searchRef}
            />
            <Button
              variant="outline-primary"
              onClick={this.props.handleSearchQuery}
            >
              Search
            </Button>
          </Form>
        ) : (
          <Container className="grid-container">
            <Row className="show-grid">
              <Col xs={12} md={4} lg={3}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  />
                  <Card.Body>
                    <Card.Title>{profileName}</Card.Title>
                    <Card.Text>
                      {email}
                      <br />
                      {address}
                    </Card.Text>
                    <Button variant="primary" onClick={this.allItems}>
                      Click to see more
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        )}
      </>
    );
  }
}
export default ProfileCard;
