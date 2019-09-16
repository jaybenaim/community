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
  handleItem
}) => {
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
<<<<<<< HEAD

=======
<<<<<<< HEAD
    setItem(itemVal);
    setPrice(priceVal);
    Root.post("items/", {
      profile_id: 14,
=======
>>>>>>> 578c303f2ce06d3d3c073e8768b259dbabe2c008
    /// call the function to set state in app
    setItem(itemVal);
    setPrice(priceVal);
    handleItem(itemVal, PriceVal);

    // make post request

    Root.post("items/", {
      profile_id: 4,
>>>>>>> af29f991ef4087a4bdaa80df08d2ca75a12ff029
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

  // handleItem = (item, price) => {
  //   this.setState(prevState => ({ item: { item, price } }));
  // };
  /// define a function that will set state in app to itemname with itemval
  //// one function that takes params to do both
  // define another function that does the same for price

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

<<<<<<< HEAD
        <Modal.Footer>
          <Button variant="secondary" onClick={handleItemClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleItemForm}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
=======
          <Modal.Footer>
            <Button variant="secondary" onClick={handleItemClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleItemForm}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
>>>>>>> af29f991ef4087a4bdaa80df08d2ca75a12ff029
    </>
  );
};

export default Item;
