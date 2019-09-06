import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import NavBar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <NavBar />
          {/* <Route
            path="/procedures"
            render={props => <Procedures {...props} />} */}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
