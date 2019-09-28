import React, { Component } from "react";

// get userprofile

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.userProfile[0].username
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.username);
  }
  render() {
    return (
      <div className="form-container">
        <h1>Let's Talk</h1>
        <form onSubmit={this.handleSubmit} className="form">
          <label htmlFor="email">What would you like to say?</label>
          <input type="text" name="chat-content" className="input" />
          <button className="submit">Submit</button>
        </form>
      </div>
    );
  }
}
export default ChatBox;
