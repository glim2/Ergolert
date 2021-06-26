import React from "react";
import axios from "axios";
import Main from "./Main";
import NavBar from "./NavBar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Alert, AlertTitle } from '@material-ui/lab';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Ergolert
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      error: "",
      auth: {},
    };
    this.signIn = this.signIn.bind(this);
    this.logout = this.logout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.attemptTokenLogin();
  }

  async signIn(credentials) {
    let response = await axios.post("/api/auth", credentials);
    if (response.data !== "error") {
      window.localStorage.setItem("token", response.data);
      this.attemptTokenLogin();
    } else {
      this.setState({
        error: "Invalid Username or Password",
      });
    }
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

  logout() {
    window.localStorage.removeItem("token");
    this.setState({username: "", password: "", auth: {}});
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value});
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const {username, password} = this.state;
    this.signIn({
      username,
      password,
    });
  }

  render() {
    const {classes} = this.props;
    if (!this.state.auth.id) {
      return (
        <div>
          <NavBar auth={this.state.auth} />
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form
                className={classes.form}
                onSubmit={this.handleSubmit}
                noValidate
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                {/* <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                /> */}
                {this.state.error.length ? (
                  <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {this.state.error}
                </Alert>
                ) : (<div/>)}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    {/* <Link href="#" variant="body2">
                      Forgot password?
                    </Link> */}
                  </Grid>
                  <Grid item>
                    <Link href="/signUp" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={8}>
              <Copyright />
            </Box>
          </Container>
        </div>
      );
    } else {
      return <Main auth={this.state.auth} logout={this.logout} />;
    }
  }
}

export default withStyles(styles)(Login);
