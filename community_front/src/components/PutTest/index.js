import React, { Component } from "react";
import Root from "../../apis/root";
import "./index.css";

class PutTest extends Component {
  state = {
    item: null,
    profile_id: 14,
    name_of_item: "",
    price: ""
  };
  // todo make form to set state
  // send values of set state to post
  getProfile = () => {
    const { profile_id } = this.state;
    Root.get(`profiles/${profile_id}/`).then(res => {
      console.log(res.data);
    });
  };
  getItems = () => {
    Root.get("items/").then(res => {
      let items = res.data;
      let newItems = [];
      (items || []).map((item, i) => {
        // const { name_of_item, price, profile_id } = item;
        newItems.push(item);
        this.setState(prevState => ({
          items: newItems
        }));
      });
      console.log(this.state.items);
    });
  };

  updateItem = () => {
    const { profile_id, name_of_item, price } = this.state;
    Root.put("items/2/", {
      profile_id: 14,
      name_of_item: "ladder",
      price: "mow the lawn"
    }).then(res => {
      console.log(res);
      let name_of_item = "green eggs and ham";
      let price = "mow the lawn";
      //   const { name_of_item, price } = this.state.item;
      //   this.setState({ item: { [name_of_item]: price } });
      this.setState({ item: { [name_of_item]: price } });
      console.log(this.state.item);
    });
  };
  render() {
    return (
      <>
        <button className="test" type="button" onClick={this.updateItem}>
          {" "}
          Update Item{" "}
        </button>
        <button className="test" type="button" onClick={this.getProfile}>
          Get My Profile{" "}
        </button>
        <button className="test" type="button" onClick={this.getItems}>
          Get Items{" "}
        </button>
      </>
    );
  }
}

export default PutTest;
