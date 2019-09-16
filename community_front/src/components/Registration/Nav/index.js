import React from "react";
import PropTypes from "prop-types";
import "./index.css";
import LoginForm from "../LoginForm";
import SignupForm from "../SignupForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

class NavbarNew extends React.Component {
  logged_out_nav = (
    <div className="center">
      <ul>
        <li
          className="btn btn-primary login"
          onClick={() => this.props.display_form("login")}
        >
          login
        </li>

        <li
          className="btn btn-primary signup"
          onClick={() => this.props.display_form("signup")}
        >
          signup
        </li>
      </ul>
    </div>
  );
  logged_in_nav = (
    <div className="center">
      <ul>
        <li
          className="btn btn-primary logout"
          onClick={this.props.handle_logout}
        >
          logout
        </li>
      </ul>
    </div>
  );
  render() {
    let form;
    switch (this.props.displayed_form) {
      case "login":
        form = <LoginForm handle_login={this.props.handle_login} />;
        break;
      case "signup":
        form = <SignupForm handle_signup={this.props.handle_signup} />;
        break;
      default:
        form = null;
    }

    return (
      <Container>
        <Row>
          {this.props.logged_in ? this.logged_in_nav : this.logged_out_nav}
          {form}
          <h3>
            {this.props.logged_in
              ? `Hello, ${this.props.username}`
              : "Please Log In"}
          </h3>
        </Row>
      </Container>
    );
  }
}
export default NavbarNew;

NavbarNew.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};
