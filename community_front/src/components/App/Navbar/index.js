import React, { useState } from "react";
import { Redirect, Route, BrowserRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
// import { Helmet } from "react-helmet";
import logo from "./logo/logo.png";
import "./index.css";
import NavbarLogin from "./NavbarLogin";
import Root from "../../../apis/root";
import MyProfile from "../MyProfile";

class NavBar extends React.Component {
  // const searchByNameOfItem = e => {
  //   e.preventDefault();
  //   let query = searchRef.current.value;
  //   props.getItems(query);
  // };

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

  // const renderRedirect = () => {
  //   console.log(redirect);
  //   if (redirect)
  //     return (
  //       <BrowserRouter>
  //         <Route
  //           path="profiles/"
  //           render={props => <MyProfile {...props} profileId={profileId} />}
  //         />
  //       </BrowserRouter>
  //     );

  // };
  componentDidMount = () => {
    // this.props.handleNavClassChange();
  };
  render() {
    const {
      navClass,
      loggedIn,
      display_form,
      handle_logout,
      username,
      displayed_form,
      handle_login,
      handle_signup,
      userProfile
    } = this.props;

    return (
      <Navbar className={navClass} expand="lg">
        <Navbar.Toggle aria-controls="nav-toggle" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/map">Map</Nav.Link>
            <Nav.Link href="/profiles/myprofile">My Profile</Nav.Link>
            <Nav.Link href="/profiles/search">My Community</Nav.Link>
            <Container>
              <Row>
                <Col sm={6} md={6} lg={6}>
                  <div className="login-display">
                    <NavbarLogin
                      loggedIn={loggedIn}
                      display_form={display_form}
                      handle_logout={handle_logout}
                      username={username}
                      displayed_form={displayed_form}
                      handle_login={handle_login}
                      handle_signup={handle_signup}
                      userProfile={userProfile}
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </Nav>
          {/* make component or render the mycommpounity page here  */}
        </Navbar.Collapse>
        <Navbar.Brand href="/">
          <img className="logo" src={logo} alt="logo" />
          <span className="company-name">&nbsp; COMMUNITY</span>
        </Navbar.Brand>
      </Navbar>
    );
  }
}

export default NavBar;
