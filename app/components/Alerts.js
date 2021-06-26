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
        {part: "nose", position: {x: 0, y: 0}},
        {part: "leftEye", position: {x: 0, y: 0}},
        {part: "rightEye", position: {x: 0, y: 0}},
        {part: "leftEar", position: {x: 0, y: 0}},
        {part: "rightEar", position: {x: 0, y: 0}},
        {part: "leftShoulder", position: {x: 0, y: 0}},
        {part: "rightShoulder", position: {x: 0, y: 0}},
        {part: "leftElbow", position: {x: 0, y: 0}},
        {part: "rightElbow", position: {x: 0, y: 0}},
        {part: "leftWrist", position: {x: 0, y: 0}},
        {part: "rightWrist", position: {x: 0, y: 0}},
        {part: "leftHip", position: {x: 0, y: 0}},
        {part: "rightHip", position: {x: 0, y: 0}},
        {part: "leftKnee", position: {x: 0, y: 0}},
        {part: "rightKnee", position: {x: 0, y: 0}},
        {part: "leftAnkle", position: {x: 0, y: 0}},
        {part: "rightAnkle", position: {x: 0, y: 0}},
      ],
    };
    // add all keypoint values together into averagePosture object
    for (let i = 0; i < initialPosture.length; i++) {
      for (let j = 0; j < initialPosture[i].keypoints.length; j++) {
        if (initialPosture[i].keypoints[j].score > 0.9) {
          averagePosture.keypoints[j].position.x +=
            initialPosture[i].keypoints[j].position.x;
          averagePosture.keypoints[j].position.y +=
            initialPosture[i].keypoints[j].position.y;
        }
      }
    }
    // map through each keypoint and divide by initialPosture.length to get average values
    averagePosture.keypoints.map((keypoint) => {
      keypoint.position.x = keypoint.position.x / initialPosture.length;
      keypoint.position.y = keypoint.position.y / initialPosture.length;
      return keypoint;
    });
    return averagePosture;
  }

  comparePosture(initialAveragePosture, poses) {
    if (this.props.auth.id !== undefined) {
      setInterval(() => {
        let compared = [];
        const currentAveragePosture = this.getAveragePosture(poses.slice(-10));
        console.log("initial", initialAveragePosture);
        console.log("current", currentAveragePosture.keypoints);
        for (let i = 0; i < currentAveragePosture.keypoints.length; i++) {
          let currentY = currentAveragePosture.keypoints[i].position.y;
          let currentX = currentAveragePosture.keypoints[i].position.x;
          let initialY = initialAveragePosture.keypoints[i].position.y;
          let initialX = initialAveragePosture.keypoints[i].position.x;
          if (currentY === 0) {
            // compared.push(null)
          } else {
            if (currentY - initialY > 40 && initialX - currentX > 40) {
              compared.push("lowRight");
            } else if (currentY - initialY > 40 && currentX - initialX > 40) {
              compared.push("lowLeft");
            } else if (currentY - initialY > 40) {
              compared.push("low");
            } else if (
              initialAveragePosture.keypoints[i].position.y -
                currentAveragePosture.keypoints[i].position.y >
              40
            ) {
              compared.push("high");
            } else if (
              initialAveragePosture.keypoints[i].position.x -
                currentAveragePosture.keypoints[i].position.x >
              40
            ) {
              compared.push("right");
            } else if (
              currentAveragePosture.keypoints[i].position.x -
                initialAveragePosture.keypoints[i].position.x >
              40
            ) {
              compared.push("left");
            } else {
              compared.push("even");
            }
          }
        }
        console.log("compared --> ", compared);
        if (compared.every((e) => e === "low" || null)) {
          alertsArray.push("You may be slouching! Time to sit up straight.");
          this.setState({
            alerts: alertsArray,
          });
        } else if (compared.every((e) => e === "high" || null)) {
          alertsArray.push(
            "Are you too close to the screen? Sit back a little!"
          );
          this.setState({
            alerts: alertsArray,
          });
        } else if (compared.every((e) => e === "right" || null)) {
          alertsArray.push(
            "I think you are off centered to the RIGHT. Let's move back to the center."
          );
          this.setState({
            alerts: alertsArray,
          });
        } else if (compared.every((e) => e === "left" || null)) {
          alertsArray.push(
            "I think you are off centered to the LEFT. Let's move back to the center."
          );
          this.setState({
            alerts: alertsArray,
          });
        } else if (compared.every((e) => e === "lowRight" || null)) {
          alertsArray.push(
            "You may be leaning to the Right. Try to straighten your body."
          );
          this.setState({
            alerts: alertsArray,
          });
        } else if (compared.every((e) => e === "lowLeft" || null)) {
          alertsArray.push(
            "You may be leaning to the LEFT. Try to straighten your body."
          );
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
          <Typography variant="h5" fontWeight="fontWeightBold">Alerts:</Typography>
          {alertsArray.map((alert) => (
            <Typography variant="body1" key={alertsArray.indexOf(alert)}>{alert}</Typography>
          ))}
        </div>
        <form onClick={this.endSession}>
          <Button variant="contained" color="primary">End Session</Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(Alerts);
