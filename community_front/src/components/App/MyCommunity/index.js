import React from "react";
import "./index.css";
import Root from "../../../apis/root";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import EditProfile from "../../EditProfile";

class MyProfile extends React.Component {
  state = {
    users: [],
    user: [],
    items: [],
    urls: [],
    profileImage:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    itemGif: "",
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    itemName: "",

    showEditForm: false,
    showAddItemForm: false,
    loading: true
  };

  componentWillMount = () => {
    console.log("logx: mounted");
    this.getAllProfiles();
  };

  getAllProfiles = () => {
    Root.get("profiles/", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        let profiles = res.data;
        console.log("logx:", profiles);
        this.setState({ allProfiles: profiles });
      })
      .catch(e => {
        console.log("logx:", e);
      });
  };

  // Fetches all the items that users have created
  getItemsFromUser = () => {
    const { userProfile } = this.props;

    console.log(userProfile);
    Root.get("items/").then(res => {
      const items = res.data;
      if (userProfile[0] !== undefined) {
        this.setState({
          items: items.filter(item => {
            if (item.profile_id === userProfile[0].id) {
              return item;
            }
          })
        });
      }
    });
  };

  changeImage = () => {
    let url = prompt("Enter a url");
    this.setState({ profileImage: url });
  };

  toggleEditForm = e => {
    e.preventDefault();
    console.log("clicked");
    if (this.state.showEditForm === false) {
      return this.setState({ showEditForm: true });
    }
    return this.setState({ showEditForm: false });
  };

  toggleAddItemForm = event => {
    event.preventDefault();
    console.log("Add Item Form Clicked!");
    if (this.state.showEditForm === false) {
      return this.setState({ showAddItemForm: !this.state.showAddItemForm });
    }
    return this.setState({ showAddItemForm: !this.state.showAddItemForm });
  };

  componentDidMount = () => {
    this.props.handleNavClassChange();
    setTimeout(() => {
      this.getItemsFromUser();
    }, 1000);
  };
  render() {
    //let profiles = this.getAllProfiles();

    return (
      <div>
        {this.state.allProfiles
          ? "Profiles(" + this.state.allProfiles.length + ")"
          : "no profiles"}
        <br />
        <br />
        {this.state.allProfiles
          ? this.state.allProfiles.map((v, i, items) => {
              //return <div>{JSON.stringify(v, null, 2)}</div>;

              return (
                <div>
                  <div>id: {v.id}</div>
                  <div>username: {v.username}</div>
                  <div>profile_name: {v.profile_name}</div>
                </div>
              );
            })
          : "no profiles"}
      </div>
    );
  }
}

export default MyProfile;
