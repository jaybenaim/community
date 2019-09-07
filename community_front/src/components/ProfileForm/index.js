import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import DjangoCSRFToken from "django-react-csrftoken";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const ProfileForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [item, setItem] = useState("");
  const [show, setShow] = useState(false);

  const handleProfileFormSubmit = event => {
    event.preventDefault();
    axios.get("/api").then(res => {
      console.log("GET Status: " + res.statusText);
    });

    axios
      .post("/api")
      .then(res => {
        console.log(res);
        console.log("Great fucking success");
      })
      .catch(err => {
        console.log("POST Status: " + err);
      });
  };

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };
  const handleAddressChange = event => {
    setAddress(event.target.value);
  };
  const handleItemChange = event => {
    setItem(event.target.value);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <form onSubmit={handleProfileFormSubmit}>
        {/* <meta name="csrf-token" content="{{ csrf_token() }}"></meta> */}
        <DjangoCSRFToken />

        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <Button variant="primary" onClick={handleShow}>
        Create Profile
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a Profile :)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleProfileFormSubmit}>
            {/* <DjangoCSRFToken /> */}
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
            <Form.Group controlId="formBasic">
              <Form.Label>Shed Item</Form.Label>
              <Form.Control
                name="item"
                onChange={handleItemChange}
                type="text"
                placeholder="Enter Item for Community"
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
