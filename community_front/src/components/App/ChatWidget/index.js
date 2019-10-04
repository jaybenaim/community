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
  state = { 
    messageId: null, 
    messages: [], 
  }

  componentDidMount() {
    // TODO:: get message from api 
    addResponseMessage("Hey I would like to borrow...");
  
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
    }).then(res => { 
              this.checkIfUserHasMessagesPending(); 

      // this.addMessageToRecievingUserProfile(newMessage);
    }).catch(err => { 
      console.log(err) 
    });
   

  };
  addMessageToRecievingUserProfile = (newMessage) => { 
      const { userProfile, userWhoBorrowedId } = this.props;
      const { id: userProfileId, user } = userProfile[0];
    Root.patch(
      `profiles/${userWhoBorrowedId}/`,
      {
        message: [newMessage.id]
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${window.localStorage["token"]}`
        }
      }
    ).then(res => {
      console.log(res.data);

    });

  }
  // TODO run function  
  checkIfUserHasMessagesPending = () => { 
    // if yes display bubble or change color of chat button 
      Root.get('messages/').then(res => { 
        let messages = res.data 
        let userId = this.props.userProfile[0].user
        let usersMessages = messages.map(message => { 
         if (message.recieving_user === userId ) { 
           return message.text
         }
        })
     this.setState({ messages: [...this.state.messages, usersMessages  ]});
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
