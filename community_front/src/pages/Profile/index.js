import React, { Component } from "react";
import axios from "axios";

class Profile extends Component {
  componentDidMount() {
    axios
      .get("/api")
      .then(res => res.json)
      .then(res => {
        console.log(res);
      });
  }
  render() {
    return <h1>Api-request</h1>;
  }
}

export default Profile;
