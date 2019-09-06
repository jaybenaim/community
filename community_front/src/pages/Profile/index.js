// import React, { useState, useEffect } from "react";
import React, { Component } from "react";
import axios from "axios";
import ProfileForm from "../../components/ProfileForm";

class Profile extends Component {
<<<<<<< HEAD
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
=======
  // state = {
  //   items: []
  // };
  // componentDidMount() {
  //   axios
  //     .get("http://localhost:8000/api")

  //     .then(res => {
  //       let items = res.data.items;

  //       items.map(item => {
  //         this.setState({
  //           items: [{ name: item.name, price: item.price }]
  //         });
  //       });
  //     });
  // }
  render() {
    return (
      <>
        <ul>
          {/* {this.state.items.map((item, index) => {
            return (
        
                {/* <li key={index}>
                  Item: {item.name} || Price: {item.price}
                </li> })} 
                 );  */}

          <ProfileForm />
        </ul>
>>>>>>> b5acc31f76442a6f436d5abda7df9ae2f92ca67b
      </>
    );
  }
}

export default Profile;
