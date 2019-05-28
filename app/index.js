import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/Header';
import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import './index.css'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      margin: 0,
      padding: 0,
    },
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#b5ffff',
      main: '#81d3f9',
      dark: '#4ba2c6',
      contrastText: '#fff',
    },
    secondary: {
      light: '#b2fab4',
      main: '#81c784',
      dark: '#519657',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: 14,
    fontWeightLight: 300, // Work Sans
    fontWeightRegular: 400, // Work Sans
    fontWeightMedium: 700, // Roboto Condensed
    fontFamilySecondary: "'Roboto Condensed', sans-serif",
  },
});

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ThemeProvider theme={ theme }>
          <CssBaseline />
          <Header />
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
