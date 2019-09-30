import React from "react";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "./logo/logo.png";
import "./index.css";
import NavbarLogin from "./NavbarLogin";

class NavBar extends React.Component {
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
        <Navbar.Brand href="/">
          <img className="logo" src={logo} alt="logo" />
          <span className="company-name">&nbsp; COMMUNITY</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="nav-toggle" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/map">Map</Nav.Link>
            <Nav.Link href="/profiles/myprofile">My Profile</Nav.Link>
            <Nav.Link href="/community/my">My Community</Nav.Link>
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
      </Navbar>
    );
  }
}

export default NavBar;
