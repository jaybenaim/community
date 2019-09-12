import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Root from "../../apis/root";

const Item = ({ show, handleClose, profileName, email, address }) => {
  //HOOKS
  const [itemName, setItemName] = useState("first name");

  //REFS
  const itemRef = React.createRef();

  const handleAddItem = event => {
    // let itemName = event.target.value;
    let newItemName = itemRef.current.value;
    setItemName({ itemName: newItemName });
  };

  const handleFormSubmit = () => {
    handleAddItem();

    Root.post("items/", {
      name_of_item: itemName.itemName,
      price: "price"
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
