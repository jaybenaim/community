import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username || "",
      profile_name: props.profile_name || "",
      email: props.email || "",
      address: props.address || ""
    };
  }

  submitEditForm = e => {
    console.log("sumbit form clicked, not implemented");
    this.props.toggleEditForm(e);
  };

  closeEditForm = e => {
    console.log("close button is clicked");
    this.props.toggleEditForm(e);
  };

  render() {
    return (
      <>
        <div>
          <Modal.Dialog>
            <Modal.Header closeButton={true} onClick={this.closeEditForm}>
              <Modal.Title>Edit your Profile</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Username (optional)</Form.Label>
                  <Form.Control
                    name="item"
                    type="text"
                    // onChange={event => onChangeItemName(event.target.value)}
                    placeholder="Modify your username"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Profile Name (optional)</Form.Label>
                  <Form.Control
                    name="price"
                    type="text"
                    // onChange={event => onChangeItemPrice(event.target.value)}
                    placeholder="Modify your Profile Name"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicName">
                  <Form.Label>E-mail (optional)</Form.Label>
                  <Form.Control
                    name="price"
                    type="text"
                    // onChange={event => onChangeItemPrice(event.target.value)}
                    placeholder="Modify your E-mail"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Address (optional)</Form.Label>
                  <Form.Control
                    name="price"
                    type="text"
                    // onChange={event => onChangeItemPrice(event.target.value)}
                    placeholder="Modify your Address"
                  />
                </Form.Group>
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={this.closeEditForm}>
                Close
              </Button>
              <Button variant="primary" onClick={this.submitEditForm}>
                Save changes
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      </>
    );
  }
}

export default EditProfile;
