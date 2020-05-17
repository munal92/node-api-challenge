import React from "react";
import {Link} from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const NavBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        <Link className='linkCls' to="/">
          <Button  color="inherit">
           Home
          </Button>
          </Link>
          <Link className='linkCls' to="/projectslist">
          <Button  color="inherit">
            Projects List
          </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
