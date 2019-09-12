import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Root from "../../apis/root";

const Item = ({ show, handleClose, profileName, email, address }) => {
  //HOOKS
  const [itemName, setItemName] = useState("first name");
  const [itemPrice, setItemPrice] = useState("price");

  //REFS
  const itemRef = React.createRef();
  const priceRef = React.createRef();

  const handleAddItem = event => {
    // let itemName = event.target.value;
    let newItemName = itemRef.current.value;
    let priceName = priceRef.current.value;
    setItemName({ itemName: newItemName });
    setItemPrice({ itemPrice: priceName });
  };

  const handleFormSubmit = () => {
    handleAddItem();

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
                  ref={itemRef}
                  placeholder="Enter An Item Name"
                  onChange={handleAddItem}
                />
              </Form.Group>
              <Form.Group controlId="formBasicName">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  name="price"
                  type="text"
                  ref={priceRef}
                  placeholder="Enter An Item Price"
                  onChange={handleAddItem}
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
