import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import Login from "./Login";
import Video from "./Video";
import Webcam from "react-webcam";
import axios from "axios";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      auth: {},
    };
    this.signIn = this.signIn.bind(this);
    this.logout = this.logout.bind(this);
  }

  async logout() {
    window.localStorage.removeItem("token");
    this.setState({auth: {}});
  }

  async attemptTokenLogin() {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/auth", {
        headers: {
          authorization: token,
        },
      });
      this.setState({auth: response.data});
    }
  }

  componentDidMount() {
    this.attemptTokenLogin();
  }

  async signIn(credentials) {
    let response = await axios.post('/api/auth', credentials);
    window.localStorage.setItem("token", response.data);
    this.attemptTokenLogin();
  }

  render() {
    if (!this.state.auth.id) {
      return (
        <div className="App">
          <header className="App-header">
            <h1>Welcome to Ergolert!</h1>
          </header>
          <Login signIn={this.signIn} />
          <div>
            <Webcam
              style={{
                position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 0,
                textAlign: "center",
                zindez: 9,
                width: 640,
                height: 480,
              }}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Welcome {this.state.auth.username}!</h1>
          <button onClick={this.logout}>Logout</button>
          <Video />
        </div>
      );
    }
  }
}

export default Main;
