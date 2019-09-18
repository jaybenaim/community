import React, { Component } from "react";
import ProfileCard from "./ProfileCard";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Root from "../../../apis/root";
import Container from "react-bootstrap/Container";
import "./index.css";

class CreateProfileForm extends Component {
  // nameRef = React.createRef();
  // emailRef = React.createRef();
  // addressRef = React.createRef();
  // state = {
  //   show: false
  // };

  // handleShow = () => {
  //   this.setState({ show: !this.state.show });
  // };

  // handleProfileFormClick = event => {
  //   const { handleProfileFormSubmit } = this.props;

<<<<<<< HEAD
    event.preventDefault();
    let profileName = this.nameRef.current.value;
    let email = this.emailRef.current.value;
    let address = this.addressRef.current.value;
    console.log(window.localStorage["token"]);
    // console.log(this.props.profileId[0].user);
    Root.post(
      "profiles/",
      {
        user: this.props.profileId[0].user,
        username: this.props.username,
        profile_name: profileName,
        email,
        address
      },
      {
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Token ${window.localStorage["token"]}`
        }
      }
    )
      .then(res => {
        this.handleShow();
=======
  //   event.preventDefault();
  //   let profileName = this.nameRef.current.value;
  //   let email = this.emailRef.current.value;
  //   let address = this.addressRef.current.value;
  //   console.log(window.localStorage["token"]);
  //   console.log(this.props.profileId[0].user);
  //   Root.post(
  //     "profiles/",
  //     {
  //       user: this.props.profileId[0].user,
  //       username: this.props.username,
  //       profile_name: profileName,
  //       email,
  //       address
  //     },
  //     {
  //       headers: {
  //         // "Content-Type": "application/json",
  //         Authorization: `Token ${window.localStorage["token"]}`
  //       }
  //     }
  //   )
  //     .then(res => {
  //       this.handleShow();
>>>>>>> 35557f78cad79a42599bbfc83e6198e5373f0b5f

  //       handleProfileFormSubmit({
  //         username: window.localStorage["username"],
  //         profile_name: profileName,
  //         email,
  //         address
  //       });
  //       console.log("POST Status: " + res.statusText);
  //     })
  //     .catch(err => {
  //       console.log("POST Status: " + err);
  //     });
  // };
  // componentDidMount = () => {
  //   this.props.getProfileFromToken();
  // };
  render() {
    const { allProfiles, allItems } = this.props;

    const profileElements = allProfiles.map((p, i) => (
      <ProfileCard key={p.id} {...p} allItems={allItems} />
    ));
    return (
      <>
        <Container className="grid-container">
          {/* Move search query here  */}
          <div>{profileElements}</div>
        </Container>
      </>
    );
  }
}

export default CreateProfileForm;
