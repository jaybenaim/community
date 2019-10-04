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
import Root from '../../../apis/root'; 
import Time from "./time";

class ChatWidget extends Component {
  state = { 
    messageId: null, 
    messages: [], 
  }

  componentDidMount() {
    // TODO:: get message from api 
    //  addResponseMessage(); 
    this.checkIfUserHasMessagesPending(); 
  }

  handleNewUserMessage = newMessage => {
    // TODO:: send message to api 

    const {userProfile, userWhoBorrowedId} = this.props
    const {id: userProfileId, user} = userProfile[0]
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
    ).then(res => { 
      console.log("message sent")
      this.setState({ messageId: res.data.id  });
    }).catch(err => { 
      console.log(err) 
    });
  };
 
  checkIfUserHasMessagesPending = () => { 
    // if yes display bubble or change color of chat button 
      const { userProfile, userWhoBorrowedId } = this.props;
      const { id: userProfileId, user: userId } = userProfile[0];
      Root.get('messages/').then(res => { 
        let messages = res.data 
      
        messages.filter(message => { 
         if (
           message.recieving_user === userId &&
           message.sending_user === userWhoBorrowedId
         ) {
           addResponseMessage(message.text);
         }
         else if (
           message.recieving_user === userWhoBorrowedId &&
           message.sending_user === userId ){ 
          
            addUserMessage(message.text)
            renderCustomComponent(Time, message.time)
           }
        })

    //  this.setState({ messages: [...this.state.messages, usersMessages  ]});
      })
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
            Chat with {this.props.userWhoBorrowedName} 
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
