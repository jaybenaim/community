import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "../Navbar";
import Profile from "../Profile";
import Home from "../Home";
import SimpleMap from "../Map";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/home" component={Home} />
        </Switch>
        <Switch>
          <NavBar />
        </Switch>
        <Switch>
          <Route path="/profiles" render={props => <Profile />} />
        </Switch>
        <Switch>
          <Route path="/map" component={SimpleMap} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
