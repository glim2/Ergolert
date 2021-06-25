import React from "react";
import {Link} from "react-router-dom";
import {AppBar, Toolbar, Typography, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  header: {
    position: "sticky",
  },
}));

const NavBar = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.header}>
      <Toolbar>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h4">Ergolert</Typography>
          </Grid>
          <Grid item>
            <nav>
              <Link to="/">Log In</Link>
              <Link to="/newUser">Sign Up</Link>
            </nav>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
