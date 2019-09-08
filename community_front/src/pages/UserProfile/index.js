import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./index.css";

class UserProfile extends React.Component {
  state = {
    imgSrc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  };

  handleImageSrc = event => {
    this.setState({
      imgSrc: event.target.value
    });
  };
  /// get api check if user has profile then show it if it does
  render() {
    const { username, email, address, shedItem, shedItemPrice } = this.props;
    const handleImageChange = () => {
      return (
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={this.handleImageSrc}>
              <Form.Group controlId="formBasicName">
                <Form.Label>Enter an Image Url</Form.Label>
                <Form.Control
                  name="name"
                  type="name"
                  onChange="handleImageSrc"
                  placeholder="Enter Image Url"
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary">Save changes</Button>
          </Modal.Footer>
        </Modal.Dialog>
      );
    };

    return (
      <>
        <div className="profile-container">
          <img
            className="profile-image"
            src={this.state.imgSrc}
            alt="profile"
            onClick={handleImageChange}
          />
          <div className="profile-info">
            <h2>{username}</h2>
            <p>{email}</p>
            <p>{address}</p>
            <p>
              Item for lend: {shedItem} <br /> Price: {shedItemPrice}
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default UserProfile;
