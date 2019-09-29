import React from "react";
import "./index.css";
import Button from "react-bootstrap/Button";
import Root from "../../../apis/root";
import ChatWidget from "../ChatWidget";

class ItemGrid extends React.Component {
  state = {
    userWhoRequestedItem: [],
    chatShow: false
  };
  resetItemAvailability = e => {
    const { id, userProfile } = this.props;

    Root.patch(
      `items/${id}/`,
      {
        profile_id: userProfile[0].id,
        user_who_borrowed: null,
        available: true
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${window.localStorage["token"]}`
        }
      }
    ).catch(err => {
      alert("Error");
    });
  };

  getUserWhoRequestedItemsProfile = () => {
    const { userWhoBorrowed: id, name } = this.props;
    id &&
      Root.get(`profiles/${id}/`).then(res => {
        this.setState({
          userWhoRequestedItem: { [name]: res.data.profile_name }
        });
      });
  };

  deleteItem = () => {
    const { id } = this.props;
    Root.delete(`items/${id}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${window.localStorage["token"]}`
      }
    })
      .then(res => {
        alert("Item Succesfully Deleted");
      })
      .catch(err => {
        alert("Something went wrong");
      });
  };
  componentDidMount = () => {
    this.getUserWhoRequestedItemsProfile();
  };

  render() {
    const {
      name,
      price,
      userWhoBorrowed,
      handleChatToggle,
      userProfile,
      chatShow
    } = this.props;

    return (
      <tr>
        {this.state.userWhoRequestedItem[name] ? (
          <td colSpan="4">
            <button onClick={handleChatToggle}>Chat</button>
            <ChatWidget
              userProfile={userProfile}
              userWhoBorrowed={this.state.userWhoRequestedItem[name]}
              chatShow={chatShow}
              handleChatToggle={handleChatToggle}
            />
          </td>
        ) : (
          <td colSpan="4"></td>
        )}
        <td>{name.toUpperCase()}</td>
        <td>
          &nbsp;&nbsp;
          {price.toUpperCase()}
          &nbsp;&nbsp;
        </td>
        {userWhoBorrowed ? (
          <td>
            {this.state.userWhoRequestedItem[name]} Requested to borrow this
            item
          </td>
        ) : (
          <td>This item is available for borrow</td>
        )}
        {userWhoBorrowed ? (
          <td>
            <Button
              className="btn reset-item-availablity"
              variant="primary"
              onClick={this.resetItemAvailability}
            >
              Reset Item Availablity
            </Button>
          </td>
        ) : (
          <td>
            <Button
              className="btn btn-danger item-delete-btn"
              variant="danger"
              onClick={this.deleteItem}
            >
              Delete Item
            </Button>
          </td>
        )}
      </tr>
    );
  }
}

export default ItemGrid;
