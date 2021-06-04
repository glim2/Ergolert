import React from "react";
import ReactDom from "react-dom";
import Main from "./components/Main";

const App = () => {
  return <Main />;
};

ReactDom.render(<App />, document.getElementById("main"));
