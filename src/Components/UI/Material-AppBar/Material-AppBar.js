import React from 'react';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  }
}));

 const ButtonAppBar = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}>
            GAMEGRADER
          </Typography>
          <Button
          onClick={props.click}
          color="inherit"
          >{props.btnText}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default ButtonAppBar;