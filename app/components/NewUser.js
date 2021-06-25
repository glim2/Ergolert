import React from "react";
import axios from "axios";
import Main from "./Main";

class NewUser extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      userId: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value});
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const {firstName, lastName, email, username, password} = this.state;
    this.createNewUser({
      firstName,
      lastName,
      email,
      username,
      password,
    });
  }

  async createNewUser(userInfo) {
    const newUserId = await axios.post("/api/user", userInfo);
    this.setState({userId: newUserId});
  }

  render() {
    if (this.state.userId === 0) {
      return (
        <div>
          <h3> New User</h3>
          <form onSubmit={this.handleSubmit}>
            <label>First Name</label>
            <input
              value={this.state.firstName}
              type="text"
              name="firstName"
              onChange={this.handleChange}
            />
            <label>Last Name</label>
            <input
              value={this.state.lastName}
              type="text"
              name="lastName"
              onChange={this.handleChange}
            />
            <label>Email</label>
            <input
              value={this.state.email}
              type="text"
              name="email"
              onChange={this.handleChange}
            />
            <label>Username</label>
            <input
              value={this.state.username}
              type="text"
              name="username"
              onChange={this.handleChange}
            />
            <label>Password</label>
            <input
              value={this.state.password}
              type="password"
              name="password"
              onChange={this.handleChange}
            />
            <button type="submit">Create New User</button>
          </form>
        </div>
      );
    } else {
      return <Main />;
    }
  }
}

export default NewUser;
