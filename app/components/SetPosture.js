import React from "react";
import {withStyles} from "@material-ui/core/styles";
import {Button, Typography} from "@material-ui/core";
import AlertIntervals from "./AlertIntervals";

const styles = (theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
});

class SetPosture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPosture: [],
      initialAveragePosture: {},
      postureSet: false,
      runPosenet: false,
      averagePostureSet: false,
      pleaseWait: "",
    };
    this.handleBegin = this.handleBegin.bind(this);
    this.handleResetPosture = this.handleResetPosture.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleBegin(evt) {
    evt.preventDefault();
    // if (!this.state.runPosenet) {
    //   this.props.runPosenet();
    // }
    this.props.init()
    this.setInitialPosture(this.props.poses);
  }

  setInitialPosture(poses) {
    if (poses.length > 10) {
      poses = poses.slice(-10);
    }
    this.setState({initialPosture: poses, runPosenet: true, postureSet: true});
  }

  handleResetPosture(evt) {
    evt.preventDefault();
    this.setState({
      initialPosture: [],
      // postureSet: false,
      averagePostureSet: false,
      pleaseWait: "",
    });
  }

  handleClick() {
    this.setState({
      pleaseWait: "Please wait 5 seconds while our algorithms load :).",
    });
    this.getInitialAveragePosture(this.state.initialPosture);
  }
  
  getInitialAveragePosture(initialPosture) {
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
    setTimeout(() => {
      // add all keypoint values together into averagePosture object
      for (let i = 0; i < initialPosture.length; i++) {
        for (let j = 0; j < initialPosture[i].keypoints.length; j++) {
          if (initialPosture[i].keypoints[j].score > 0.50) {
            averagePosture.keypoints[j].x +=
              initialPosture[i].keypoints[j].x;
            averagePosture.keypoints[j].y +=
              initialPosture[i].keypoints[j].y;
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
      this.setState({
        initialAveragePosture: averagePosture,
        averagePostureSet: true,
      });
    }, 5000);
  }
  
  render() {
    const {classes} = this.props;
    if (!this.state.postureSet) {
      return (
        <div>
          <Typography variant="body1"><strong>Before you begin:</strong></Typography>
          <Typography variant="body1">Sit up nice and tall</Typography>
          <Typography variant="body1">Relax your shoulders</Typography>
          <Typography variant="body1">Click the button below to get started</Typography>
          <Typography variant="body1">For more information on best posture practices click <a href="https://ergonomictrends.com/creating-perfect-ergonomic-workspace-ultimate-guide/" target="_blank">here</a></Typography>
          <form className={classes.root} onClick={this.handleBegin}>
            <Button variant="contained" color="primary">
              Begin
            </Button>
          </form>
        </div>
      );
    } else {
      if (!this.state.averagePostureSet) {
        return (
          <div>
            <Typography variant="body1">Please stay as still as possible until your posture is set</Typography>
            <form className={classes.root}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleClick}
              >
                Set Posture
              </Button>
              <Typography variant="body1">{this.state.pleaseWait}</Typography>
            </form>
          </div>
        );
      } else {
        return (
          <div>
            <Typography variant="h5">Enjoy!</Typography>
            <form className={classes.root} onClick={this.handleResetPosture}>
              <Button variant="contained" color="primary">
                Reset Posture
              </Button>
            </form>
            <AlertIntervals
              initialAveragePosture={this.state.initialAveragePosture}
              poses={this.props.poses}
              auth={this.props.auth}
            />
          </div>
        );
      }
    }
  }
}

export default withStyles(styles)(SetPosture);
