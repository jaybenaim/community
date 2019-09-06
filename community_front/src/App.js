import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const App = () => {
  return (
    <Router>
      <head>
        <script
          src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"
          integrity="sha384-xrRywqdh3PHs8keKZN+8zzc5TX0GRTLCcmivcbNJWm2rs5C8PRhcEn3czEjhAO9o"
          crossorigin="anonymous"
        ></script>
      </head>
      <div className="container">
        <div className="App">
          <nav className="nav navbar">
            <Link to="/">Home</Link>
          </nav>
          <Switch>
            <Route></Route>
          </Switch> 
        </div>
      </div>
    </Router>
  );
};

export default App;
