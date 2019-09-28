import React, { Component } from "react";
import {
  Widget,
  addResponseMessage,
  addLinkSnippet,
  addUserMessage
} from "react-chat-widget";

import "react-chat-widget/lib/styles.css";

class ChatWidget extends Component {
  componentDidMount() {
    addResponseMessage("Lets Chat!");
  }

  handleNewUserMessage = newMessage => {
    // Now send the message throught the backend API
    addUserMessage(newMessage);
  };

  render() {
    return (
      <Widget
        handleNewUserMessage={this.handleNewUserMessage}
        title="Let's Chat"
        subtitle="User who borrowed goes here"
      />
    );
  }
}

export default ChatWidget;
