import React from "react";

let alertsArray = ["Enjoy!"];

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
    setInterval(() => {
      let compared = [];
      const currentAveragePosture = this.getAveragePosture(poses.slice(-10));
      // console.log("initial", initialAveragePosture);
      // console.log("current", currentAveragePosture.keypoints);
      for (let i = 0; i < currentAveragePosture.keypoints.length; i++) {
        if (currentAveragePosture.keypoints[i].position.y !== 0) {
          if (currentAveragePosture.keypoints[i].position.y - initialAveragePosture.keypoints[i].position.y > 50) {
            compared.push("low");
          } else {compared.push("even")}
        }
      }
      console.log("compared --> ", compared);
      if (compared.every((e) => e === "low")) {
        alertsArray.push("You may be slouching! Time to sit up straight.");
        this.setState({
          alerts: alertsArray,
        });
      }
    }, 5000 /*this.props.alertInterval*/);
  }

  endSession() {
    alertsArray = ["Enjoy!"];
    this.setState({
      alerts: alertsArray,
    });
  }

  render() {
    return (
      <div>
        <div>
          <h2>Alerts:</h2>
          {alertsArray.map((alert) => (
            <p key={alertsArray.indexOf(alert)}>{alert}</p>
          ))}
        </div>
        <form onClick={this.endSession}>
          <button type="button">End Session</button>
        </form>
      </div>
    );
  }
}

export default Alerts;
