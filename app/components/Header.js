import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { FlightTakeoff } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

export default function Logo ( {} ) {
  return (
    <AppBar position="relative">
      <Toolbar>
        <FlightTakeoff />        
        <Typography variant="h6" color="inherit" noWrap>
          Foodventures
        </Typography>
        <Button href="#">
          Sign Up
        </Button>
      </Toolbar>
    </AppBar>
  )
}
