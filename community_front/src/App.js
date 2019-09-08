import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { Helmet } from "react-helmet";
import NavBar from "./components/Navbar";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Router>
      <div className="App">
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
