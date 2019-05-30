import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const backgroundImage =
  'https://images.unsplash.com/photo-1470565581138-78d4bde12f74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80';

const styles = theme => ({
	backgroundClass: {
		backgroundImage: `url(${backgroundImage})`,
		backgroundPosition: 'center',
	},
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    zIndex: -2,
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#b5ffff', 
    opacity: 0.3,
    zIndex: -1,
  },
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
		height: '100vh',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  paperRoot: {
    display: 'flex',
    padding: '2px 4px',
    alignItems: 'center',
    marginBottom: '18rem',
    width: 300,
    [theme.breakpoints.up('sm')]: {
      width: 700,
    }
  },
  input: {
    flex: 1,
    padding: '8px'
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
  iconButton: {
    padding: 10,
  }
});

class ProductEntry extends Component {
  constructor(props) {
    super(props);
	}

  handleSubmit(event) {
    console.log('hi');
  }
  render() {
    const { classes } = this.props;
    console.log(IconButton)
    return (
      <section className={classes.root}>
        <Paper className={classes.paperRoot}>
          <InputBase
            className={classes.input}
            placeholder="Food (Name or Image)"
            required={ true }
            inputProps={{ 'aria-label': 'Food (Name or Image)' }}
          />
          <Divider className={classes.divider} />
          <InputBase
            className={classes.input}
            placeholder="Location"
            required={ true }
            inputProps={{ 'aria-label': 'Location' }}
          />
          <IconButton 
            color="primary" 
            className={classes.iconButton} 
            aria-label="Search"
            onClick = {this.handleSubmit}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
        <div className={classes.backdrop} />
			  <div className={clsx(classes.background, classes.backgroundClass)} />
        <img style={{ display: 'none' }} src={ backgroundImage } alt="" />
      </section>
    )
  }
}

export default withStyles(styles)(ProductEntry);
