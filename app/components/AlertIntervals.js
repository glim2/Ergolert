import React from "react";
import {withStyles} from "@material-ui/core/styles";
import {Button, Typography} from "@material-ui/core";
import Alerts from "./Alerts";

const styles = (theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
});

class AlertIntervals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertInterval: 60000,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    this.setState({alertInterval: evt.currentTarget.value});
  }

  render() {
    const {classes} = this.props;
    return (
      <div>
        <div>
          <form className={classes.root}>
          <Typography variant="h5">Change Time of Alerts</Typography>
            <Button
              variant="contained"
              color="default"
              value={60000}
              onClick={this.handleClick}
            >
              1 Minute
            </Button>
            <Button
              variant="contained"
              color="default"
              value={180000}
              onClick={this.handleClick}
            >
              3 Minutes
            </Button>
            <br></br>
            <Button
              variant="contained"
              color="default"
              value={300000}
              onClick={this.handleClick}
            >
              5 Minutes
            </Button>
            <Button
              variant="contained"
              color="default"
              value={600000}
              onClick={this.handleClick}
            >
              10 Minutes
            </Button>
            <Typography variant="body1">
              Posture Alerts Every {this.state.alertInterval / 60000} Minutes
            </Typography>
          </form>
        </div>
        <Alerts
          initialAveragePosture={this.props.initialAveragePosture}
          poses={this.props.poses}
          alertInterval={this.state.alertInterval}
          auth={this.props.auth}
        />
      </div>
    );
  }
}

export default withStyles(styles)(AlertIntervals);
