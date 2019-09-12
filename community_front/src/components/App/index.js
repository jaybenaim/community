import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "../Navbar";
import Profile from "../Profile";
import Home from "../Home";
import SimpleMap from "../Map";
import Profiles from "../Profiles";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
        <Switch>
          <NavBar />
        </Switch>
        <Switch>
          <Route exact path="/profiles" render={props => <Profile />} />
        </Switch>
        <Switch>
          <Route path="/all" component={Profiles} />
        </Switch>
        <Switch>
          <Route path="/map" component={SimpleMap} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
