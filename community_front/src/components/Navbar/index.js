import React from "react";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
// import { Helmet } from "react-helmet";
import logo from "./logo/logo.png";
import "./index.css";
import NavbarNew from "../Registration/Nav";

class NavBar extends React.Component {
  render() {
    return (
      <Navbar className="nav" bg="light" expand="lg">
        <Navbar.Brand href="/">
          <img className="logo" src={logo} alt="logo" />
          Community
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <NavbarNew
            logged_in={this.props.logged_in}
            display_form={this.props.display_form}
            handle_logout={this.handle_logout}
            username={this.props.username}
            displayed_form={this.props.displayed_form}
            logged_in={this.props.logged_in}
            username={this.props.username}
            handle_login={this.props.handle_login}
            handle_signup={this.props.handle_signup}
          />

          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/profiles">Profiles</Nav.Link>
            <Nav.Link href="/map">Map</Nav.Link>
            <NavDropdown title="Category" id="basic-nav-dropdown">
              <NavDropdown.Item href="/category/outdoor">
                Outdoor
              </NavDropdown.Item>
              <NavDropdown.Item href="/category/indoor">
                Indoor
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/category/powertools">
                Power Tools
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/category/saws">Saws</NavDropdown.Item>
              <NavDropdown.Item href="/category/ladders">
                Ladders
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-primary">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
