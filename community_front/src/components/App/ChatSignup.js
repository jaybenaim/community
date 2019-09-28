// src/Components/Signup.js

import React, { Component } from "react";

class ChatSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: props.userProfile,
      username: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ username: this.state.username });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.username);
  }
  changeView(e) {
    const { changeView } = this.props;
    e.preventDefault();
    changeView("ChatBox");
  }
  render() {
    return (
      <div className="form-container">
        <h1>Let's Talk</h1>
        <form onSubmit={this.handleSubmit} className="form">
          <label htmlFor="email">
            {this.state.userProfile[0].email} is this correct?{" "}
          </label>
          <input
            type="email"
            name="username"
            onChange={this.handleChange}
            className="input"
            placeholder="Confirm Email"
          />
          <button className="submit" onClick={this.changeView}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}
export default ChatSignup;
