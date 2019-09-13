import React from "react";
// import Modal from "react-bootstrap/Modal";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import "./index.css";
import Root from "../../apis/root";

class UserProfile extends React.Component {
  inputOpenFileReference;

  constructor(props) {
    super(props);

    this.inputOpenFileReference = React.createRef();

    this.state = {
      imgSrc:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      imgChange: false,
      show: false,
      items: [],
      userItems: []
    };
  }
  componentDidMount() {
    Root.get("items/").then(res => {
      let items = res.data;
      this.setState({ items: [items] });
      console.log(this.state.items);
    });
  }
  handleClose = () => {
    this.setState({ show: false });
  };
  handleShow = () => this.setState({ show: true });

  handleImageSrc = event => {
    this.setState({
      imgChange: true
    });
  };

  onChangeFile = event => {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    console.log(file);
    this.setState(
      {
        imgSrc: file
      },
      () => {
        const form = new FormData();
        form.append("file", this.state.imgSrc);
        Root.post("/profile_img_upload/", form, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        // YourAjaxLib.doUpload('/yourEndpoint/',form).then(result=> console.log(result));
      }
    ); /// if you want to upload latter
  };

  handleImageChange = () => {
    this.inputOpenFileReference.current.click();
    // let src = prompt("Enter a image url");
    // if (src !== null) this.setState({ imgSrc: src });
    // else this.setState({ imgSrc: this.state.imgSrc });
  };

  render() {
    const {
      profileName,
      email,
      address,
      showProfile,
      itemName,
      itemPrice
    } = this.props;

    return (
      <>
        <div className="profile-container">
          <input
            ref={this.inputOpenFileReference}
            type="file"
            style={{ display: "none" }}
            onChange={this.onChangeFile}
          />
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
          {!showProfile && (
            <div className="profile-info">
              <h2>{profileName}</h2>
              <label htmlFor="email">EMAIL</label>
              <p>{email}</p>
              <label htmlFor="address">ADDRESS</label>
              <p>{address}</p>
              <div>
                <label htmlFor="items">Items for Lend</label>
                <br />
                <label htmlFor="items">Name:&nbsp;&nbsp;</label>
                {itemName} <br />
                <label htmlFor="items">Price:&nbsp;&nbsp; </label>
                {itemPrice}
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default UserProfile;
