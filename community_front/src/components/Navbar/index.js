import React, { useState } from "react";
import { Redirect, Route, BrowserRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
// import { Helmet } from "react-helmet";
import logo from "./logo/logo.png";
import "./index.css";
import NavbarLogin from "../Registration/Nav";
import Root from "../../apis/root";
import MyProfile from "../MyProfile";

const NavBar = props => {
  const [items, setItems] = useState([]);
  const [profileId, setProfileId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const searchRef = React.createRef();

  const searchByNameOfItem = e => {
    e.preventDefault();
    let query = searchRef.current.value;
    props.getItems(query);
  };

  // const getItems = query => {
  //   Root.get("items/").then(res => {
  //     let items = res.data;
  //     (items || []).map((item, i) => {
  //       // const { name_of_item, price, profile_id } = item;
  //       if (item.name_of_item.toLowerCase() === query.toLowerCase()) {
  //         setItems(item);
  //         setProfileId(item.profile_id);
  //       }
  //       return item;
  //     });
  //   });
  //   setLoading(false);
  //   !loading && getProfile();
  // };
  // const getProfile = () => {
  //   Root.get(`profiles/${profileId}/`).then(res => {
  //     setRedirect(true);

  //     console.log(res.data);
  //   });
  //   renderRedirect();
  // };

  const renderRedirect = () => {
    console.log(redirect);
    if (redirect)
      return (
        <BrowserRouter>
          <Route
            path="profiles/:profileId"
            render={props => <MyProfile {...props} profileId={profileId} />}
          />
        </BrowserRouter>
      );
  };

  return (
    <Navbar className="nav" bg="light" expand="lg">
      <Navbar.Brand href="/">
        <img className="logo" src={logo} alt="logo" />
        Community
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/map">Map</Nav.Link>
          <Nav.Link href="/profiles/:profileId/">My Profile</Nav.Link>
          <Nav.Link href="/users/profiles">My Community</Nav.Link>

          <NavbarLogin
            logged_in={props.logged_in}
            display_form={props.display_form}
            handle_logout={props.handle_logout}
            username={props.username}
            displayed_form={props.displayed_form}
            handle_login={props.handle_login}
            handle_signup={props.handle_signup}
          />
        </Nav>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            ref={searchRef}
          />
          <Button variant="outline-primary" onClick={searchByNameOfItem}>
            Search
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
