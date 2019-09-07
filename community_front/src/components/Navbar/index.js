import React from "react";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
// import { Helmet } from "react-helmet";
import logo from "../../logo/logo.png";

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/home">
        <img className="logo" src={logo} alt="logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/profiles">Profiles</Nav.Link>
          <Nav.Link href="/map">Map</Nav.Link>
          <NavDropdown title="Category" id="basic-nav-dropdown">
            <NavDropdown.Item href="/category/outdoor">
              Outdoor
            </NavDropdown.Item>
            <NavDropdown.Item href="/category/indoor">Indoor</NavDropdown.Item>
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
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
