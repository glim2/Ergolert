import React from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import NewUser from "./NewUser";
import Main from "./Main";

const Routes = () => {
  return (
      <div>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/newUser" component={NewUser} />
        </Switch>
      </div>
  );
};

export default Routes;
