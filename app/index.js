import React from "react";
import ReactDom from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";
import Routes from "./components/Routes";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <Router>
        <NavBar />
        <Routes />
    </Router>
  )
};

ReactDom.render(<App />, document.getElementById("main"));
