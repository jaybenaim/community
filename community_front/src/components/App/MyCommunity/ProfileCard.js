import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./index.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import Root from "../../apis/root";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

class ProfileCard extends React.Component {
  render() {
    const { profile_name, email, address } = this.props;

    return (
      <>
        <Card style={{ width: "10rem", height: ".5em" }}>
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
              {/* {this.state.profileSearched.email}
              <br />
              {this.state.profileSearched.address} */}
            </Card.Text>
            <Button
              variant="primary"
              // onClick={this.showProfilePageForSearchedUser}
            >
              {/* <a href={this.state.profileSearched.idUrl}> */}
              Click to see {profile_name}'s profile
              {/* </a> */}
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  }
}
export default ProfileCard;
