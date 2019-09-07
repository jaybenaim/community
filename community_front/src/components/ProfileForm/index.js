import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const ProfileForm = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [shedItem, setItem] = useState([]);
  const [shedItemPrice, setItemPrice] = useState("");
  const [show, setShow] = useState(false);

  const handleProfileFormSubmit = event => {
    event.preventDefault();
    axios
      .post("/api", {
        username,
        email,
        address,
        shedItem,
        shedItemPrice
      })
      .then(res => {
        console.log(username, email, address, shedItem, shedItemPrice);
        console.log("POST Status: " + res.statusText);
        handleClose();
      })
      .catch(err => {
        console.log("POST Status: " + err);
      });
  };

  async function getData(event) {
    await axios.get("/api").then(res => {
      let profiles = res.data.profiles;
      console.log(profiles);
      console.log("GET Status: " + res.statusText);
    });
  }

  const handleNameChange = event => {
    setName(event.target.value);
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
  const handleItemPriceChange = event => {
    setItemPrice(event.target.value);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" onClick={getData}>
        Get request
      </Button>
      <Button variant="primary" onClick={handleShow}>
        Create Profile
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a Profile :)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleProfileFormSubmit}>
            <Form.Group controlId="formBasicEmail">
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
            <Form.Group controlId="formBasic">
              <Form.Label>Item for lend</Form.Label>
              <Form.Control
                name="item"
                onChange={handleItemChange}
                type="text"
                placeholder="Enter Item for lend"
              />
            </Form.Group>
            <Form.Group controlId="formBasic">
              <Form.Label>Item Price</Form.Label>
              <Form.Control
                name="itemPrice"
                onChange={handleItemPriceChange}
                type="text"
                placeholder="Enter Item Price"
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
