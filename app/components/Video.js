import React, {useRef} from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-backend-webgl";
// import "@tensorflow/tfjs-backend-wasm";
import Webcam from "react-webcam";
import SetPosture from "./SetPosture";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Video = (props) => {
  const classes = useStyles(props);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  let poses = [];

  // Load Posenet
  // const runPosenet = async () => {
    //   const net = await posenet.load({
      //     inputResolution: {width: 640, height: 480},
      //     scale: 0.5,
      //   });
      //   detect(net)
      // };
      
  // Load movenet
  const init = async () => {
    const detectorConfig = {
      modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
    }
    const detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
      detectorConfig
    )
    detect(detector)
  }

  const detect = async (detector) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video properties
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Make Detections
      let pose = await detector.estimatePoses(video);
      console.log(pose);

      requestAnimationFrame(async () => {
        await detect(detector)
      })

      drawCanvas(pose, videoWidth, videoHeight, canvasRef);
      poses.push(pose[0])
      while (poses.length > 100) {
        poses.shift()
      }
    }
  };

   const drawKeypoint = (keypoint) => {
    const ctx = canvasRef.current.getContext("2d");
    // If score is null, just show the keypoint.
    const confidence = keypoint.score != null ? keypoint.score : 1;
    const scoreThreshold = 0.3 || 0;

    if (confidence >= scoreThreshold) {
      const circle = new Path2D();
      circle.arc(keypoint.x, keypoint.y, 4, 0, 2 * Math.PI);
      ctx.fill(circle);
      ctx.stroke(circle);
    }
  }

  const drawKeypoints = (keypoints) => {
    const ctx = canvasRef.current.getContext("2d");
    const keypointInd = poseDetection.util.getKeypointIndexBySide("MoveNet");
    ctx.fillStyle = "White";
    ctx.strokeStyle = "White";
    ctx.lineWidth = 2;

    //middle points will be white (just nose)
    for (const i of keypointInd.middle) {
      drawKeypoint(keypoints[i]);
    }
    //left points will be green... note your actual left side (technically right side when looking at video)
    ctx.fillStyle = "Green";
    for (const i of keypointInd.left) {
      drawKeypoint(keypoints[i]);
    }
    //right points will be orange... note your actual right side (technically left side when looking at video)
    ctx.fillStyle = "Orange";
    for (const i of keypointInd.right) {
      drawKeypoint(keypoints[i]);
    }
  }

  const drawCanvas = (poses, videoWidth, videoHeight, canvas) => {
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(poses[0].keypoints);
  }

  return (
    <Grid container direction="row" justify="space-between" className={classes.root}>
      <Grid item>
        <div>
          <SetPosture
            init={() => init()}
            runPosenet={() => runPosenet()}
            poses={poses}
            auth={props.auth}
          />
        </div>
      </Grid>
      <Grid item>
        <div id="webcam">
          <Webcam
            ref={webcamRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 9,
              width: 640,
              height: 480,
            }}
          />

          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 9,
              width: 640,
              height: 480,
            }}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default Video;
