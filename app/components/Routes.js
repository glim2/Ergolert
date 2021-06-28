import React from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import Main from "./Main";
import MyProfile from"./MyProfile";

const Routes = () => {
  return (
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signUp" component={SignUp} />
          <Route path="/profile" component={MyProfile} />
        </Switch>
      </div>
  );
};

export default Routes;
