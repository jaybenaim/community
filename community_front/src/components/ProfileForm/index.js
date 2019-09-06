import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

class ProfileForm extends React.Component {
  state = {
    name:"",
    email: "",
    address: "",
    item: "",
  };
  handleProfileFormSubmit = event => {
    event.preventDefault();
    axios.post("http://localhost:8000/api").then(res => {
      console.log(res);
      console.log(res.data);
    });
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };
  handleAddressChange = event => {
    this.setState({ address: event.target.value });
  };
  handleItemChange = event => {
    this.setState({ item: event.target.value });
  };

  render() {
    return (
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Create a Profile :)</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={this.handleProfileFormSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                onChange={this.handleEmailChange}
                type="email"
                placeholder="Enter Email"
              />
            </Form.Group>
            <Form.Group controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                onChange={this.handleAddressChange}
                type="text"
                placeholder="Enter Address"
              />
            </Form.Group>
            <Form.Group controlId="formBasic">
              <Form.Label>Shed Item</Form.Label>
              <Form.Control
                name="item"
                onChange={this.handleItemChange}
                type="text"
                placeholder="Enter Item for Community"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button onClick={this.handleProfileFormSubmit} variant="primary">
            Save changes
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
}

export default ProfileForm;
