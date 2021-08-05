import React from "react";
import {withStyles} from "@material-ui/core/styles";
import {Button, Typography} from "@material-ui/core";

const styles = (theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
});

let alertsArray = [];

class Alerts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alerts: [],
    };
    this.comparePosture(this.props.initialAveragePosture, this.props.poses);
    this.endSession = this.endSession.bind(this);
  }

  getAveragePosture(initialPosture) {
    // create knew averagePosture object to store average position values
    let averagePosture = {
      keypoints: [
        {y: 0, x: 0, score: 0, name: "nose"},
        {y: 0, x: 0, score: 0, name: "leftEye"},
        {y: 0, x: 0, score: 0, name: "rightEye"},
        {y: 0, x: 0, score: 0, name: "leftEar"},
        {y: 0, x: 0, score: 0, name: "rightEar"},
        {y: 0, x: 0, score: 0, name: "leftShoulder"},
        {y: 0, x: 0, score: 0, name: "rightShoulder"},
        {y: 0, x: 0, score: 0, name: "leftElbow"},
        {y: 0, x: 0, score: 0, name: "rightElbow"},
        {y: 0, x: 0, score: 0, name: "leftWrist"},
        {y: 0, x: 0, score: 0, name: "rightWrist"},
        {y: 0, x: 0, score: 0, name: "leftHip"},
        {y: 0, x: 0, score: 0, name: "rightHip"},
        {y: 0, x: 0, score: 0, name: "leftKnee"},
        {y: 0, x: 0, score: 0, name: "rightKnee"},
        {y: 0, x: 0, score: 0, name: "leftAnkle"},
        {y: 0, x: 0, score: 0, name: "rightAnkle"},
      ],
    };
    // add all keypoint values together into averagePosture object
    for (let i = 0; i < initialPosture.length; i++) {
      for (let j = 0; j < initialPosture[i].keypoints.length; j++) {
        if (initialPosture[i].keypoints[j].score > 0.50) {
          averagePosture.keypoints[j].x += initialPosture[i].keypoints[j].x;
          averagePosture.keypoints[j].y += initialPosture[i].keypoints[j].y;
          averagePosture.keypoints[j].score +=
            initialPosture[i].keypoints[j].score;
        }
      }
    }
    // map through each keypoint and divide by initialPosture.length to get average values
    averagePosture.keypoints.map((keypoint) => {
      keypoint.x = keypoint.x / initialPosture.length;
      keypoint.y = keypoint.y / initialPosture.length;
      keypoint.score = keypoint.score / initialPosture.length;
      return keypoint;
    });
    return averagePosture;
  }

  comparePosture(initialAveragePosture, poses) {
    if (this.props.auth.id !== undefined) {
      setInterval(() => {
        let compared = [];
        console.log('poses --> ', poses)
        const currentAveragePosture = this.getAveragePosture(poses.slice(-10));
        console.log("initial", initialAveragePosture);
        console.log("current", currentAveragePosture.keypoints);
        for (let i = 0; i < currentAveragePosture.keypoints.length; i++) {
          let currentY = currentAveragePosture.keypoints[i].y;
          let currentX = currentAveragePosture.keypoints[i].x;
          let initialY = initialAveragePosture.keypoints[i].y;
          let initialX = initialAveragePosture.keypoints[i].x;
          if (currentY === 0) {
            // compared.push(null)
          } else {
            if (currentY - initialY > 30 && initialX - currentX > 50) {
              compared.push("lowRight");
            } else if (currentY - initialY > 30 && currentX - initialX > 50) {
              compared.push("lowLeft");
            } else if (currentY - initialY > 30) {
              compared.push("low");
            } else if (initialY - currentY > 30) {
              compared.push("high");
            } else if (initialX - currentX > 50) {
              compared.push("right");
            } else if (currentX - initialX > 50) {
              compared.push("left");
            } else {
              compared.push("even");
            }
          }
        }
        console.log("compared --> ", compared);
        if (compared.every((e) => e === "lowRight")) {
          alertsArray.push(
            "You may be leaning to the RIGHT. Try to straighten your body."
          );
          this.setState({
            alerts: alertsArray,
          });
        } else if (compared.every((e) => e === "lowLeft")) {
          alertsArray.push(
            "You may be leaning to the LEFT. Try to straighten your body."
          );
          this.setState({
            alerts: alertsArray,
          });
        } else if (compared.every((e) => e === "high")) {
          alertsArray.push(
            "Are you too close to the screen? Sit back a little!"
          );
          this.setState({
            alerts: alertsArray,
          });
        } else if (compared.every((e) => e === "right")) {
          alertsArray.push(
            "I think you are off centered to the RIGHT. Let's move back to the center."
          );
          this.setState({
            alerts: alertsArray,
          });
        } else if (compared.every((e) => e === "left")) {
          alertsArray.push(
            "I think you are off centered to the LEFT. Let's move back to the center."
          );
          this.setState({
            alerts: alertsArray,
          });
        } else if (compared.every((e) => e.includes("low"))) {
          alertsArray.push("You may be slouching! Time to sit up straight.");
          this.setState({
            alerts: alertsArray,
          });
        }
      }, 5000 /*this.props.alertInterval*/);
    }
  }

  endSession() {
    alertsArray = [];
    this.setState({
      alerts: alertsArray,
    });
  }

  render() {
    const {classes} = this.props;
    return (
      <div>
        <div className={classes.root}>
          <Typography variant="h5" fontWeight="fontWeightBold">
            Alerts:
          </Typography>
          {alertsArray.map((alert) => (
            <Typography variant="body2" key={alertsArray.indexOf(alert)}>
              {alert}
            </Typography>
          ))}
        </div>
        <form className={classes.root}>
          <Button variant="contained" color="primary">
            Save Session
          </Button>
        </form>
        <form className={classes.root} onClick={this.endSession}>
          <Button variant="contained" color="primary">
            End Session
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(Alerts);
