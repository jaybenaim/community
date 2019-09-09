import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "../Navbar";
import Profile from "../Profile";
import Home from "../Home";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Route path="/home" component={Home} />

        <Switch>
          <NavBar />
        </Switch>
        <Switch>
          <Route path="/profiles" render={props => <Profile />} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
