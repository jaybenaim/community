// import React, { useState, useEffect } from "react";
import React, { Component } from "react";
import axios from "axios";

class Profile extends Component {
  state = {
    items: []
  };
  componentDidMount() {
    axios
      .get("http://localhost:8000/api")

      .then(res => {
        let items = res.data.items;

        items.map(item => {
          this.setState({
            items: [{ name: item.name, price: item.price }]
          });
        });
      });
  }
  render() {
    return (
      <>
        <ul>
          {this.state.items.map((item, index) => {
            return (
              <li key={index}>
                Item: {item.name} || Price: {item.price}
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

export default Profile;
