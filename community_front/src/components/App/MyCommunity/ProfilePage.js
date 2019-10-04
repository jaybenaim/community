import React from "react";
import "./index.css";
import Root from "../../../apis/root";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProfileItem from "./ProfileItem";
import ChatWidget from "../ChatWidget";
import Button from "react-bootstrap/Button";

class ProfilePage extends React.Component {
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

    Root.get("items/").then(res => {
      const items = res.data;
      if (userProfile !== undefined) {
        this.setState({
          items: items.filter(item => {
            if (item.profile_id === userProfile.id) {
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

  handleNewUserMessage = newMessage => {
    // TODO:: send message to api

    const { userProfile, userWhoBorrowedId } = this.props;
    const { id: userProfileId, user } = userProfile;
    Root.post(
      "messages/",
      {
        text: newMessage,
        sending_user: user,
        recieving_user: userWhoBorrowedId
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${window.localStorage["token"]}`
        }
      }
    )
      .then(res => {
        console.log("message sent");
        this.setState({ messageId: res.data.id, user: userProfile });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount = () => {
    this.props.handleNavClassChange();

    this.getItemsFromUser();
  };

  render() {
    const { items, itemGif, image } = this.state;

    const { userProfile, currentUserProfile } = this.props;
    

    let itemElements = items.map((item, i) => {
      const { id, name_of_item, price, available, profile_id } = item;

      return (
        <ProfileItem
          key={i}
          id={id}
          image={itemGif || image}
          name={name_of_item}
          price={price}
          available={available}
          userProfileId={profile_id}
          userProfile={userProfile[0]}
          currentUserProfile={currentUserProfile}
        />
      );
    });

    return (
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
                    {userProfile.profile_name || null}
                  </p>
                </Row>
                <br />
                <Row>
                  <p className="profile-email">
                    <span className="bold"> Email:</span> {userProfile.email}
                  </p>
                  <br />
                </Row>
                <Row>
                  <p className="profile-address">
                    <br />
                    <span className="bold"> Address: </span>
                    <a href="/map"> {userProfile.address}</a>
                  </p>
                </Row>
              </div>
            </section>
          </Col>
          <Col xs={12} md={12} lg={6} className="profile-items">
            {itemElements}
            <Button
              variant="outline-info"
              onClick={this.props.handleChatToggle}
            >
              Chat
            </Button>

            <ChatWidget
              currentUserProfile={this.props.currentUserProfile}
              userProfile={this.props.userProfile}
              chatShow={this.props.chatShow}
              handleChatToggle={this.props.handleChatToggle}
              userWhoBorrowedId={userProfile.user}
              title={userProfile.profileName}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ProfilePage;
