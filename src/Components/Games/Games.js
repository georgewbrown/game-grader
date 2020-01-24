import React, { useState, Fragment, useCallback } from 'react';
import './Games.css';
import axios from 'axios';
import MaterialAppBar from '../UI/Material-AppBar/Material-AppBar';
import GameFeed from './GameFeed/GameFeed';
import GameForm from './GameForm/GameForm';
import Filter from '../UI/Filter/Filter';

const Games = () => {
  const [gamesList, setGamesList] = useState([]);
  const [showGameForm, setshowGameForm] = useState(false);
  const [showGameFeed, setshowGameFeed] = useState(true);
  const [buttonText, setButtonText] = useState('Add A Game');
  let domContent = null;

  const getFilterHandler = useCallback(filterObject => {
    setGamesList(filterObject);
  }, []);

  const deleteGameHandler = gameID => {
    axios
      .delete(`https://game-grade.firebaseio.com/games/${gameID}.json`)
      .then(res => {
        console.log(res);
      });
  };

  const toggleGameFeed = () => {
    setshowGameFeed(!showGameFeed);
    setshowGameForm(!showGameForm);
    if (showGameFeed) {
      setButtonText('Add A Game');
    } else {
      setButtonText('View All Games');
    }
  };

  if (showGameFeed) {
    domContent = (
      <Fragment>
        <MaterialAppBar click={toggleGameFeed} btnText={buttonText} />
        <div className="filterSection">
          <h2>Filter The Game List</h2>
          <Filter onFilter={getFilterHandler} />
        </div>
        <hr />
        <GameFeed games={gamesList} onRemoveGame={deleteGameHandler} />
      </Fragment>
    );
  } else {
    domContent = (
      <Fragment>
        <MaterialAppBar click={toggleGameFeed} btnText={buttonText} />
        <GameForm />
      </Fragment>
    );
  }

  return domContent;
};

export default Games;
