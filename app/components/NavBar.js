import React from "react";
// import {Link} from "react-router-dom";
import {AppBar, Toolbar, Typography, Grid, Link} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  header: {
    position: "sticky",
  },
  root: {
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

const NavBar = (props) => {
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
            {!props.auth || !props.auth.id ? (
              <nav></nav>
            ) : (
              <nav>
                <Typography className={classes.root}>
                  <Link href="/" color="inherit">Main</Link>
                  <Link href="/profile" color="inherit">My Profile</Link>
                  <Link href="#" color="inherit" onClick={props.logout}>
                    Logout
                  </Link>
                </Typography>
              </nav>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
