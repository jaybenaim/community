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
class ChatWidget extends Component {
  componentDidMount() {
    addResponseMessage("Hey I would like to borrow...");
  }

  handleNewUserMessage = newMessage => {
    // Now send the message throught the backend API
    // addUserMessage(newMessage);
  };

  render() {
    return (
      <Modal
        onHide={() => false}
        className="modal-form"
        show={this.props.chatShow}
      >
        <Modal.Header>
          <Modal.Title name="someValue">
            Chat With {this.props.userWhoBorrowed}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Widget
            handleNewUserMessage={this.handleNewUserMessage}
            title="Chatting With"
            subtitle={this.props.userWhoBorrowed}
          />
          <Button onClick={this.props.handleChatToggle}>Close</Button>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ChatWidget;
