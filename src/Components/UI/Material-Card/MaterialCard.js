import React from 'react';
import './MaterialCard.css';
import { makeStyles, Card, CardContent, CardMedia, Typography, Button, CardActions } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    minWidth: 160,
  },
  pos: {
    marginBottom: 12,
  },
}));

const MaterialCard = props => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
        <CardMedia
        className={classes.cover}
        image={props.image}
        title={props.title}
        />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography
            component="h5"
            variant="h5">
            {props.title}
          </Typography>
          <Typography
            className={classes.pos}
            color="textSecondary">
            <img
            className="esrBImage"
            src={props.esrbRating}
            alt="ESRB Rating"
            /> | {props.playerRating}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary">
            {props.description}
          </Typography>
      <CardActions>
        <Button size="small" color="secondary" onClick={props.removeItem}>Remove Game</Button>
      </CardActions>
        </CardContent>
      </div>
    </Card>
  );
}

export default MaterialCard;