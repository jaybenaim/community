import React from "react";
import PropTypes from "prop-types";
import "./index.css";
import LoginForm from "../LoginForm";
import SignupForm from "../SignupForm";

class Nav extends React.Component {
  logged_out_nav = (
    <ul>
      <li onClick={() => this.props.display_form("login")}>login</li>
      <li onClick={() => this.props.display_form("signup")}>signup</li>
    </ul>
  );
  logged_in_nav = (
    <ul>
      <li onClick={this.props.handle_logout}>logout</li>
    </ul>
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
      <div className="down">
        {this.props.logged_in ? this.logged_in_nav : this.logged_out_nav}
        {form}
        <h3>
          {this.props.logged_in
            ? `Hello, ${this.props.username}`
            : "Please Log In"}
        </h3>
      </div>
    );
  }
}
export default Nav;

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};
