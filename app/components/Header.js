import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { FlightTakeoff } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  toolbar: {
    justifyContent: 'space-between',
  },
  placeholder: {
    height: 56,
    [theme.breakpoints.up('sm')]: {
      height: 64,
    }
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  title: {
    paddingLeft: '0.5rem'
  }
});

function Header (props) {
  const { classes } = props;

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <FlightTakeoff />
          <Typography variant="h6" color="inherit" className={classes.title} noWrap>
            foodventures
          </Typography>
          <div className={classes.right}>
            <Button href="#">
              Sign Up
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  )
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
