import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Root from "../../../apis/root";

const Item = ({ handleItem, userProfile, toggleAddItemForm }) => {
  // create hook state for holding item and price temp
  const [item, setItem] = useState(null);
  const [price, setPrice] = useState(null);

  // create ref here for input values
  const itemRef = React.createRef();
  const priceRef = React.createRef();

  const handleItemForm = e => {
    e.preventDefault();
    let itemVal = itemRef.current.value;
    let priceVal = priceRef.current.value;

    /// call the function to set state in app
    setItem(itemVal);
    setPrice(priceVal);

    setTimeout(() => {
      handleItem(itemVal, priceVal);
    }, 1000);
    Root.post(
      "items/",
      {
        profile_id: userProfile[0].id,
        name_of_item: itemVal,
        price: priceVal,
        available: true
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${window.localStorage["token"]}`
        }
      }
    )
      .then(res => {
        handleItem(item, price);
        alert("Item Successfully Added! ");
      })
      .catch(err => {
        alert("Something Went Wrong");
        console.log(err);
      });
  };

  const handleClose = event => {
    toggleAddItemForm(event);
  };
  return (
    <>
      <div>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Item Form</Modal.Title>
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
                />
              </Form.Group>
              <Form.Group controlId="formBasicName">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  name="price"
                  type="text"
                  ref={priceRef}
                  placeholder="Enter An Item Price"
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleItemForm}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </>
  );
};

export default Item;
