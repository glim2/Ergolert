import React, {useRef} from "react";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import {drawKeypoints, drawSkeleton} from "../utilities";
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

  // Load posenet
  const runPosenet = async () => {
    const net = await posenet.load({
      inputResolution: {width: 640, height: 480},
      scale: 0.5,
    });
    // setInterval(() => {
    //   detect(net);
    // }, 600);
    detect(net)
  };

  const detect = async (net) => {
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
      const pose = await net.estimateSinglePose(video);
      console.log(pose);

      requestAnimationFrame(async () => {
        await detect(net)
      })

      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
      poses.push(pose);
    }
  };

  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(pose["keypoints"], 0.5, ctx);
    drawSkeleton(pose["keypoints"], 0.5, ctx);
  };

  return (
    <Grid container direction="row" justify="space-between" className={classes.root}>
      <Grid item>
        <div>
          <SetPosture
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
