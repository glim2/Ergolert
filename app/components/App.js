import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./Login";
import Main from "./Main";

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">Welcome to Ergolert!</header>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/main/:userId" component={Main} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;