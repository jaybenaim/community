import React from "react";
import "./index.css";
import Root from "../../../apis/root";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ProfileItem from "./ProfileItem";
import Item from "./ItemForm";
import CreateProfileForm from "./CreateProfileForm";
import EditProfile from "../../EditProfile";

class MyProfile extends React.Component {
  state = {
    user: [],
    items: [],
    urls: [],
    profileImage:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    itemGif: "",
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    itemName: "",

    showEditForm: false,
    showAddItemForm: false,
    loading: true
  };

  // Fetches all the items that users have created
  getItemsFromUser = () => {
    const { userProfile } = this.props;

    console.log(userProfile);
    Root.get("items/").then(res => {
      const items = res.data;
      if (userProfile[0] !== undefined) {
        this.setState({
          items: items.filter(item => {
            if (item.profile_id === userProfile[0].id) {
              return item;
            }
          })
        });
      }
    });
  };

  changeImage = () => {
    let url = prompt("Enter a url");
    this.setState({ profileImage: url });
  };
  componentDidMount = () => {
    this.props.handleNavClassChange();
    setTimeout(() => {
      this.getItemsFromUser();
    }, 1000);
  };

  toggleEditForm = e => {
    e.preventDefault();
    console.log("clicked");
    if (this.state.showEditForm === false) {
      return this.setState({ showEditForm: true });
    }
    return this.setState({ showEditForm: false });
  };

  toggleAddItemForm = event => {
    event.preventDefault();
    console.log("Add Item Form Clicked!");
    if (this.state.showEditForm === false) {
      return this.setState({ showAddItemForm: !this.state.showAddItemForm });
    }
    return this.setState({ showAddItemForm: !this.state.showAddItemForm });
  };

  render() {
    const { items, itemGif, image } = this.state;

    const { userProfile } = this.props;

    let itemElements = items.map((item, i) => {
      const { name_of_item, price } = item;

      return (
        <ProfileItem
          key={i}
          image={itemGif || image}
          name={name_of_item}
          price={price}
        />
      );
    });

    let createProfileForm;
    let profile;

    {
      this.props.userProfile[0] === undefined
        ? (createProfileForm = (
            <CreateProfileForm
              loadProfile={this.props.getProfileFromToken}
              userProfile={this.props.userProfile}
              getProfile={this.getProfile}
            />
          ))
        : (profile = (
            <Container className="cont">
                     
              <Row>
                <Col xs={12} md={12} lg={4} className="con">
                  <section>
                    <img
                      className="profile-image"
                      src={this.state.profileImage}
                      alt="profile"
                      onClick={this.changeImage}
                    />
                    <div className="profile-details">
                      <Row>
                        <p className="profile-name">
                          {userProfile[0].profile_name || null}
                        </p>
                      </Row>
                      <br />
                      <Row>
                        <p className="profile-email">
                          <span className="bold"> Email:</span>{" "}
                          {userProfile[0].email}
                        </p>
                        <br />
                      </Row>
                      <Row>
                        <p className="profile-address">
                          <br />
                          <span className="bold"> Address: </span>
                          <a href="/map"> {userProfile[0].address}</a>
                        </p>
                      </Row>

                      <Button
                        className="add-item-button"
                        variant="primary"
                        onClick={this.toggleAddItemForm}
                      >
                        Add Item
                      </Button>
                    </div>
                    {this.state.showAddItemForm && (
                      <Item
                        toggleAddItemForm={this.toggleAddItemForm}
                        itemName={this.state.itemName}
                        handleItemClose={this.handleItemClose}
                        onChangeItemPrice={this.onChangeItemPrice}
                        onChangeItemName={this.onChangeItemName}
                        handleFormSubmit={this.handleFormSubmit}
                        displayItemForm={this.displayItemForm}
                        handleItem={this.props.handleItem}
                        userProfile={this.props.userProfile}
                      />
                    )}
                  </section>
                </Col>
                <Col xs={12} md={12} lg={6} className="profile-items">
                  {itemElements}
                </Col>
              </Row>
              <Button
                className="edit-profile-button"
                variant="primary"
                onClick={this.toggleEditForm}
              >
                          Edit Profile         
              </Button>
              {this.state.showEditForm && (
                <EditProfile toggleEditForm={this.toggleEditForm} />
              )}
            </Container>
          ));
    }

    return (
      <>
        <div>
          {createProfileForm}

          {profile}
        </div>
      </>
    );
  }
}

export default MyProfile;
