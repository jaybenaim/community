import React, { Component } from "react";
import ProfileCard from "../ProfileCard";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Root from "../../apis/root";
import Container from "react-bootstrap/Container";
import "./index.css";
class AllProfiles extends Component {
  nameRef = React.createRef();
  emailRef = React.createRef();
  addressRef = React.createRef();
  state = {
    show: false
  };

  handleShow = () => {
    this.setState({ show: !this.state.show });
  };

  handleProfileFormClick = event => {
    const { handleProfileFormSubmit, handleClose } = this.props;

    event.preventDefault();
    let profileName = this.nameRef.current.value;
    let email = this.emailRef.current.value;
    let address = this.addressRef.current.value;

    Root.post("profiles/", {
      username: profileName,
      profile_name: profileName,
      email,
      address
    })
      .then(res => {
        this.handleShow();

        handleProfileFormSubmit({
          username: profileName,
          profile_name: profileName,
          email,
          address
        });
        console.log("POST Status: " + res.statusText);
      })
      .catch(err => {
        console.log("POST Status: " + err);
      });
  };
  render() {
    const {
      allProfiles,
      allItems,
      handleProfileFormSubmit,
      handleFormSubmit,
      handleShow,
      show,
      handleClose,
      handleProfileFormClick
    } = this.props;

    const profileElements = allProfiles.map((p, i) => (
      <ProfileCard key={p.id} {...p} allItems={allItems} />
    ));
    return (
      <>
        <Container className="grid-container">
          <Button
            className="butoon"
            variant="outline-primary"
            onClick={this.handleShow}
          >
            Create a Profile
          </Button>
          <Modal className="modal-form" show={this.state.show}>
            <Modal.Header>
              <Modal.Title name="someValue">Create a Profile </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Profile Name</Form.Label>
                  <Form.Control
                    name="name"
                    ref={this.nameRef}
                    type="name"
                    placeholder="Enter Profile Name"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    ref={this.emailRef}
                    type="email"
                    placeholder="Enter Email"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    name="address"
                    ref={this.addressRef}
                    type="text"
                    placeholder="Enter Address"
                  />
                </Form.Group>
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={this.handleShow} variant="secondary">
                Close
              </Button>
              <Button variant="primary" onClick={this.handleProfileFormClick}>
                Save changes
              </Button>
            </Modal.Footer>
          </Modal>
          <div>{profileElements}</div>
        </Container>
      </>
    );
  }
}

export default AllProfiles;
