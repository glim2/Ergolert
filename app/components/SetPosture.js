import React from "react";
import AlertIntervals from "./AlertIntervals";

class SetPosture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPosture: [],
      initialAveragePosture: {},
      postureSet: false,
      runPosenet: false,
      averagePostureSet: false,
      pleaseWait: ''
    };
    this.handleSetPosture = this.handleSetPosture.bind(this);
    this.handleResetPosture = this.handleResetPosture.bind(this);
    this.handleClick = this.handleClick.bind(this)
  }

  handleSetPosture(evt) {
    evt.preventDefault();
    if (!this.state.runPosenet) {
      this.props.runPosenet();
    }
    this.setInitialPosture(this.props.poses)
  }

  handleResetPosture(evt) {
    evt.preventDefault();
    this.setState({initialPosture: [], postureSet: false, averagePostureSet: false, pleaseWait: ''})
  }

  setInitialPosture(poses) {
    if (poses.length > 5) {
      poses = poses.slice(-5)
      this.setState({initialPosture: poses, postureSet: true, runPosenet: true});
    }
    this.setState({initialPosture: poses, postureSet: true, runPosenet: true});
  }

  getInitialAveragePosture(initialPosture) {
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
    setTimeout(() => {
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
      this.setState({initialAveragePosture: averagePosture, averagePostureSet: true})
    }, 5000);
  }

  handleClick() {
    this.setState({pleaseWait: 'Please wait 5 seconds while our algorithms load :).'})
    this.getInitialAveragePosture(this.state.initialPosture)
  }

  render() {
    console.log("this is the new state --> ", this.state);
    if (!this.state.postureSet) {
      return (
        <div>
          <form onClick={this.handleSetPosture}>
            <button type="button">Set Posture</button>
          </form>
        </div>
      );
    } else {
      if (!this.state.averagePostureSet) {
      return (
        <div>
          <p>Your posture is set! Click Begin to start working.</p>
          <form>
            <button type="button" onClick={this.handleClick}>Begin</button>
            <p>{this.state.pleaseWait}</p>
          </form>
        </div>
      )
      } else {
        return (
          <div>
            <h2>Enjoy!</h2>
            <form onClick={this.handleResetPosture}>
              <button type="button">Reset Posture</button>
            </form>
            <AlertIntervals initialAveragePosture={this.state.initialAveragePosture} poses={this.props.poses} />
          </div>
        )
      }
    }
  }
}

export default SetPosture;
