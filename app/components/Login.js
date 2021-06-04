import React from "react";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value});
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const {username, password} = this.state;
    this.props.signIn({
      username,
      password,
    });
  }

  render() {
    return (
      <div>
        <h3>User Login</h3>
        <form onSubmit={this.handleSubmit}>
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
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
