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
  show
}) => {
  // create hook state for holding item and price temp
  const [item, setItem] = useState(null);
  const [price, setPrice] = useState(null);

  // create ref here for input values
  const itemRef = React.createRef();
  const priceRef = React.createRef();

  /// create function to handle form submit or use passed down one
  /// in this function get the value of the ref

  ///

  const handleItemForm = e => {
    e.preventDefault();
    let itemVal = itemRef.current.value;
    let priceVal = priceRef.current.value;
    setItem(itemVal);
    setPrice(priceVal);
    Root.post("items/", {
      profile_id: 14,
      name_of_item: itemVal,
      price: priceVal
    })
      .then(res => {
        console.log("Success");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
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
                ref={itemRef}
                // onChange={event => onChangeItemName(event.target.value)}
                placeholder="Enter An Item Name"
              />
            </Form.Group>
            <Form.Group controlId="formBasicName">
              <Form.Label>Price</Form.Label>
              <Form.Control
                name="price"
                type="text"
                ref={priceRef}
                // onChange={event => onChangeItemPrice(event.target.value)}
                placeholder="Enter An Item Price"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleItemClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleItemForm}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </>
  );
};

export default Item;
