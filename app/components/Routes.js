import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import Login from "./Login";
import Main from "./Main";

const Routes = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">Welcome to Ergolert!</header>
        <Login />
        <Main />
      </div>
    </Router>
  );
}

export default Routes;