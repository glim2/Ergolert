import React from "react";

class Login extends React.Component {
  render() {
    return (
      <div>
        <h1>User Login</h1>
        <form>
          <label>Username</label>
          <input type="text" name="Username" />
          <label>Password</label>
          <input type="password" name="Password" />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
