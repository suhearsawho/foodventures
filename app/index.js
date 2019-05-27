import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Header from './components/Header';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

}));

class App extends Component {

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
