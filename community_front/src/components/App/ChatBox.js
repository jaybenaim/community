import React, { Component } from "react";
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";
import { INSTANCE_LOCATOR, CHAT_TOKEN } from "../../apis/keys";
import ChatInput from "./ChatInput";
// get userprofile

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.userProfile[0].username || null,
      currentRoom: { users: [] },
      messages: [],
      users: []
    };
    this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount = () => {
    console.log(this.state.currentUser);
    const chatManager = new ChatManager({
      instanceLocator: INSTANCE_LOCATOR,
      userId: window.localStorage["id"],
      tokenProvider: new TokenProvider({
        url: CHAT_TOKEN
      })
    });
    chatManager
      .connect()
      .then(currentUser => {
        this.setState({ currentUser });
        return currentUser.subscribeToRoom({
          roomId: "16d86a55-7a06-4e62-bc94-138a0efb3127",
          messageLimit: 100,
          hooks: {
            onMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              });
            }
          }
        });
      })
      .then(currentRoom => {
        this.setState({
          currentRoom,
          users: currentRoom.userIds
        });
      })
      .catch(error => console.log(error));
  };
  addMessage(text) {
    this.state.currentUser
      .sendMessage({
        text,
        roomId: this.state.currentRoom.id
      })
      .catch(error => console.error("error", error));
  }
  render() {
    return (
      <div className="form-container">
        <h2 className="header">Let's Chat</h2>
        <ChatInput className="input-field" onSubmit={this.addMessage} />
        {/* <form onSubmit={this.handleSubmit} className="form">
          <label htmlFor="email">What would you like to say?</label>
          <input type="text" name="chat-content" className="input" />
          <button className="submit">Submit</button>
        </form> */}
      </div>
    );
  }
}
export default ChatBox;
