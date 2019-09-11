import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Root from "../../apis/root";

const ProfileForm = ({
  show,
  handleShow,
  handleClose,
  handleProfileFormSubmit
}) => {
  const nameRef = React.createRef();
  const emailRef = React.createRef();
  const addressRef = React.createRef();

  const handleProfileFormClick = event => {
    event.preventDefault();
    let profileName = nameRef.current.value;
    let email = emailRef.current.value;
    let address = addressRef.current.value;
    
    console.log(profileName)
    console.log(email)
    console.log(address)
    Root.post("profiles/", {
      username: profileName,
      profile_name: profileName,
      email,
      address
    })
      .then(res => {
        handleClose();
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

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create Profile
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a Profile :)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Profile Name</Form.Label>
              <Form.Control
                name="name"
                ref={nameRef}
                type="name"
                placeholder="Enter Profile Name"
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                ref={emailRef}
                type="email"
                placeholder="Enter Email"
              />
            </Form.Group>
            <Form.Group controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                ref={addressRef}
                type="text"
                placeholder="Enter Address"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleClose} variant="secondary">
            Close
          </Button>
          <Button variant="primary" onClick={handleProfileFormClick}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileForm;
