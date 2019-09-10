import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ProfileForm = ({
  show,
  handleShow,
  handleClose,
  handleNameChange,
  handleEmailChange,
  handleAddressChange,
  handleItemChange,
  handleItemPriceChange,
  handleProfileFormSubmit
}) => {
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
          <Form onSubmit={handleProfileFormSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Profile Name</Form.Label>
              <Form.Control
                name="name"
                onChange={handleNameChange}
                type="name"
                placeholder="Enter Profile Name"
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                onChange={handleEmailChange}
                type="email"
                placeholder="Enter Email"
              />
            </Form.Group>
            <Form.Group controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                onChange={handleAddressChange}
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
          <Button onClick={handleProfileFormSubmit} variant="primary">
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileForm;
