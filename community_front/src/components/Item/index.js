import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Root from "../../apis/root";

const Item = ({ show, handleClose, profileName, email, address }) => {
  //HOOKS
  const [itemName, setItemName] = useState("first name");
  const [itemPrice, setItemPrice] = useState("price");

  // //REFS
  // const itemRef = React.createRef();
  // const priceRef = React.createRef();

  const handleAddItemName = event => {
    let itemName = event.target.value;
    setItemName({ itemName: itemName });
  };
  const handleAddItemPrice = event => {
    let itemPrice = event.target.value;
    setItemPrice({ itemPrice: itemPrice });
  };

  const handleFormSubmit = () => {
    // handleAddItem();

    Root.post("items/", {
      name_of_item: itemName.itemName,
      price: itemPrice.itemPrice
    })
      .then(res => {
        console.log("Item added");
      })
      .catch(err => {
        console.log(err);
      });
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
                  name="item"
                  type="text"
                  // ref={itemRef}
                  onChange={handleAddItemName}
                  placeholder="Enter An Item Name"
                />
              </Form.Group>
              <Form.Group controlId="formBasicName">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  name="price"
                  type="text"
                  // ref={priceRef}
                  onChange={handleAddItemPrice}
                  placeholder="Enter An Item Price"
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary">Close</Button>
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
