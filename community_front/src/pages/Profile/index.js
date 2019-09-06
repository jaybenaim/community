// import React, { useState, useEffect } from "react";
import React, { Component } from "react";
import axios from "axios";

class Profile extends Component {
  state = {
    name: "",
    email: "",
    address: "",
    shed_items: ""
  };
  componentDidMount() {
    console.log("mounted");
  }
  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const user = {
      name: this.state.name
    };
    axios
      .get("/api")

      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  };

  render() {
    return (
      <>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Person Name:
              <input type="text" name="name" onChange={this.handleNameChange} />
            </label>
            <button type="submit">Add</button>
          </form>
        </div>
      </>
    );
  }
}

export default Profile;
