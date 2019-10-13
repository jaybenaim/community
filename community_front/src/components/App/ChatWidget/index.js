import React, { Component } from "react";
import {
  Widget,
  addResponseMessage,
  addLinkSnippet,
  addUserMessage,
  renderCustomComponent
} from "react-chat-widget";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// import "react-chat-widget/lib/styles.css";
import "./index.css";
import Root from "../../../apis/root";
import Time from "./time";

class ChatWidget extends Component {
  state = {
    messageId: null,
    messages: [],
    title:
      `Chatting with ${this.props.title}` ||
      `Chatting with ${this.props.userWhoBorrowedName}`,
    subtitle: "Welcome"
  };

  componentDidMount() {
    // TODO:: get message from api
    //  addResponseMessage();
    this.checkIfUserHasMessagesPending();
  }

  handleNewUserMessage = newMessage => {
    // TODO:: send message to api

    const { userProfile, userWhoBorrowedId, currentUserProfile } = this.props;
    const { id: userProfileId, user } = currentUserProfile[0];
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
        this.setState({ messageId: res.data.id });
      })
      .catch(err => {
        console.log(err);
      });
  };

  checkIfUserHasMessagesPending = () => {
    // if yes display bubble or change color of chat button
    const { userProfile, userWhoBorrowedId, currentUserProfile } = this.props;
    const { user: userId } = currentUserProfile[0];

    Root.get("messages/").then(res => {
      let messages = res.data;
      console.log(messages + localStorage.token);
      messages.filter(message => {
        if (
          message.recieving_user === userId &&
          message.sending_user === userWhoBorrowedId
        ) {
          const messageProps = { messageTime: message.time, sender: "server" };
          addResponseMessage(message.text);
          renderCustomComponent(Time, messageProps);
        } else if (
          message.recieving_user === userWhoBorrowedId &&
          message.sending_user === userId
        ) {
          const messageProps = { messageTime: message.time, sender: "client" };
          addUserMessage(message.text);
          renderCustomComponent(Time, messageProps);
        }
      });

      // this.setState({ messages: [...this.state.messages, usersMessages] });
    });
  };

  render() {
    return (
      <Modal
        onHide={() => false}
        className="modal-form"
        show={this.props.chatShow}
      >
        <Modal.Header>
          <Modal.Title name="someValue">{this.state.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Widget
            handleNewUserMessage={this.handleNewUserMessage}
            title={this.state.title}
            subtitle={this.state.subtitle}
          />
          <Button onClick={this.props.handleChatToggle}>Close</Button>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ChatWidget;
