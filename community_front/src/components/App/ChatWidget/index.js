import React, { Component } from "react";
import {
  Widget,
  addResponseMessage,
  addLinkSnippet,
  addUserMessage
} from "react-chat-widget";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// import "react-chat-widget/lib/styles.css";
import "./index.css";
import Root from '../../../apis/root'; 

class ChatWidget extends Component {

  componentDidMount() {
    // TODO:: get message from api 
    // addResponseMessage("Hey I would like to borrow...");
  }

  handleNewUserMessage = newMessage => {
    // TODO:: send message to api 
    // addUserMessage(newMessage);
    Root.post(
      "messages/",
      {
        text: newMessage,
        sending_user: this.props.userProfile[0].user, 
        recieving_user: this.props.userWhoBorrowedId
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${window.localStorage["token"]}`
        }
      }
    ).then(res => { 
      console.log("message sent")
    }).catch(err => { 
      console.log(err) 
    });

  };

  checkIfUserHasMessagesPending = () => { 
    // if yes display bubble or change color of chat button 

  }

  render() {
    return (
      <Modal
        onHide={() => false}
        className="modal-form"
        show={this.props.chatShow}
      >
        <Modal.Header>
          <Modal.Title name="someValue">
            Chat With {this.props.userWhoBorrowedName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Widget
            handleNewUserMessage={this.handleNewUserMessage}
            title="Chatting With"
            subtitle={this.props.userWhoBorrowedName}
          />
          <Button onClick={this.props.handleChatToggle}>Close</Button>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ChatWidget;
