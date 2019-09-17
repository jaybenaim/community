import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./index.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import Root from "../../apis/root";

class ProfileCard extends React.Component {
  state = {
    profiles: this.props.allProfiles,
    items: this.props.allItems
    // imgChange: false,
    // imgSrc:
    //     "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  };

  // handleImageSrc = event => {
  //   this.setState({
  //     imgChange: true
  //   });
  // };

  // onChangeFile = event => {
  //   event.stopPropagation();
  //   event.preventDefault();
  //   var file = event.target.files[0];
  //   console.log(file);
  //   this.setState(
  //     {
  //       imgSrc: file
  //     },
  //     () => {
  //       const form = new FormData();
  //       form.append("file", this.state.imgSrc);
  //       Root.post("/profile_img_upload/", form, {
  //         headers: {
  //           "Content-Type": "multipart/form-data"
  //         }
  //       });

  //       // YourAjaxLib.doUpload('/yourEndpoint/',form).then(result=> console.log(result));
  //     }
  //   ); /// if you want to upload latter
  // };
  // handleImageChange = () => {
  //   this.inputOpenFileReference.current.click();
  //   // let src = prompt("Enter a image url");
  //   // if (src !== null) this.setState({ imgSrc: src });
  //   // else this.setState({ imgSrc: this.state.imgSrc });
  // };

  render() {
    const { profile_name, email, address, allItems } = this.props;
    return (
      <>
        <Container className="grid-container">
          <Row className="show-grid">
            <Col xs={12} md={4} lg={3}>
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                />
                <Card.Body>
                  <Card.Title>{profile_name}</Card.Title>
                  <Card.Text>
                    {email}
                    <br />
                    {address}
                  </Card.Text>
                  <Button variant="primary" onClick={allItems}>
                    Click to see more
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default ProfileCard;
