import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Root from "../../apis/root";

const Item = ({
  handleFormSubmit,
  handleItemClose,
  itemName,
  itemPrice,
  onChangeItemPrice,
  onChangeItemName,
  show,
}) => {
  return (
    <>
      <div>
        <Modal.Dialog>
          <Modal.Header closeButton={true} onHide={handleItemClose}>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicName">
                <Form.Label>Item</Form.Label>
                <Form.Control
                  name="item"
                  type="text"
                  value={itemName}
                  // ref={itemRef}
                  onChange={event => onChangeItemName(event.target.value)}
                  placeholder="Enter An Item Name"
                />
              </Form.Group>
              <Form.Group controlId="formBasicName">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  name="price"
                  type="text"
                  value={itemPrice}
                  // ref={priceRef}
                  onChange={event => onChangeItemPrice(event.target.value)}
                  placeholder="Enter An Item Price"
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleItemClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleFormSubmit}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </>
  );
};

export default Item;
