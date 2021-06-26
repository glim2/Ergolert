import React from "react";
import {BrowserRouter as Router, Link} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";
import Video from "./Video";
import Login from "./Login";
import NavBar from "./NavBar";

const styles = (theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
});

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {classes} = this.props
    if (this.props.auth.id) {
      return (
        <div>
          <NavBar auth={this.props.auth} logout={this.props.logout} />
          <div>
            <Typography variant="h4">
            Welcome {this.props.auth.firstName}!</Typography>
          </div>
          <div>
            <Video auth={this.props.auth} />
          </div>
        </div>
      );
    } else {
      return (
        <Login />
      )
    }
  }
}

export default withStyles(styles)(Main);
