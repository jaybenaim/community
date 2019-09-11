import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Item = ({ show, handleClose }) => {
  //HOOKS
  const [firstName, setFirstName] = useState("first name");

  const handleFirstNameChange = event => {
    const firstName = event.target.value;
    setFirstName({ [firstName]: firstName });
    console.log(firstName);
  };
  return (
    <>
      <div>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicName">
                <Form.Label>Item</Form.Label>
                <Form.Control
                  name="name"
                  type="name"
                  placeholder="Enter An Item Name"
                  onChange={handleFirstNameChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary">Save changes</Button>
          </Modal.Footer>
        </Modal.Dialog>
        {/*
        
*/}
      </div>
    </>
  );
};

export default Item;
