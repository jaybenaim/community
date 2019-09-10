import React from "react";
// import Modal from "react-bootstrap/Modal";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import "./index.css";

class UserProfile extends React.Component {
  state = {
    imgSrc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    imgChange: false,
    show: false
  };
  handleClose = () => {
    this.setState({ show: false });
  };
  handleShow = () => this.setState({ show: true });

  handleImageSrc = event => {
    this.setState({
      imgChange: true
    });
  };

  handleImageChange = () => {
    let src = prompt("Enter a image url");
    if (src !== null) this.setState({ imgSrc: src });
    else this.setState({ imgSrc: this.state.imgSrc });
  };
  render() {
    const { profileName, email, address, showProfile } = this.props;

    return (
      <>
        <div className="profile-container">
          <img
            className="profile-image"
            src={this.state.imgSrc}
            alt="profile"
            onClick={this.handleImageChange}
          />
          {/* {this.state.imgChange ? (
            <Modal show={this.state.show} onHide={this.handleClose}>
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
                      placeholder="Enter Image Url"
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary">Close</Button>
                <Button variant="primary">Save changes</Button>
              </Modal.Footer>
            </Modal>
          ) : 
          */}
          {showProfile ? (
            <div className="profile-info">
              <h2>{profileName}</h2>
              <label htmlFor="email">EMAIL</label>
              <p>{email}</p>
              <label htmlFor="address">ADDRESS</label>

              <p>{address}</p>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </>
    );
  }
}

export default UserProfile;
