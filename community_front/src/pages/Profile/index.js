// import React, { useState, useEffect } from "react";
import React, { Component } from "react";
import axios from "axios";

class Profile extends Component {
  //   const [items, setItems] = useState({});
  //   const [profiles, setProfile] = useState({});
  state = {
    items: []
  };
  //   useEffect(() => {
  componentDidMount() {
    axios
      .get("http://localhost:8000/api")
      //   .then(res => res.json())
      .then(res => {
        let items = res.data.items;
        for (let i = 0; i < items.length; i++) {
          this.setState({ items: [...this.state.items, items[i].name] });
        }
        // setItems(res.data.items);
        // setProfile(res.profiles);
        // console.log(res.data.items);
        // console.log(items);
      });
    //   });
  }
  render() {
    return (
      <>
        <h1> {this.state.items}</h1>
        {/* <h1>Items{JSON.stringify(items)}</h1>
      <h2>Profiles{JSON.stringify(profiles)}</h2> */}
      </>
    );
  }
}

export default Profile;
