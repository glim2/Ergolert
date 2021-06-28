import React from "react";
import axios from "axios";
import NavBar from "./NavBar";

class MyProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      auth: {},
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  async getUserInfo() {
    let userInfo;
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/auth", {
        headers: {authorization: token},
      });
      userInfo = response.data;
    }
    this.setState({
      auth: userInfo,
    });
  }

  render() {
    return (
      <div>
        <NavBar auth={this.state.auth} logout={this.props.logout} />
        <div>
          <h3>Username: {this.state.auth.username}</h3>
          <h3>
            Name: {this.state.auth.firstName} {this.state.auth.lastName}
          </h3>
          <h3>Email: {this.state.auth.email}</h3>
          <h3>Past Sessions: </h3>
        </div>
      </div>
    );
  }
}

export default MyProfile;
