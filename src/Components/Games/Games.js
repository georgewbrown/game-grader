import React, { useState, Fragment, useCallback } from 'react';
import './Games.css';
import axios from 'axios';
import GameFeed from './GameFeed/GameFeed';
import GameForm from './GameForm/GameForm';
import MaterialAppBar from '../UI/Material-AppBar/Material-AppBar';
import MaterialFilter from '../UI/Material-Filter/MaterialFilter';

const Games = () => {
  const [gamesList, setGamesList] = useState([]);
  const [showGameFeed, setshowGameFeed] = useState(true);
  const [buttonText, setButtonText] = useState('Add A Game');
  let domContent = null;

  const filteredGamesHandler = useCallback(filteredGames => setGamesList(filteredGames), []);

  const removeGameHandler = async gameID => {
    await axios
      .delete(`https://game-grade.firebaseio.com/games/${gameID}.json`)
      .then(() => setGamesList(prevGamesList => prevGamesList.filter(game => game.id !== gameID)))
      .catch(error => console.error(error));
  };

  const toggleGameFeed = () => {
    showGameFeed ? setButtonText('View All Games') : setButtonText('Add A Game');
    setshowGameFeed(!showGameFeed);
  };

  if (showGameFeed) {
    domContent = (
      <Fragment>
        <MaterialAppBar click={toggleGameFeed} btnText={buttonText} />
        <div className="filterSection">
          <h2>Filter The Game List</h2>
          <MaterialFilter onFilter={filteredGamesHandler} />
        </div>
        <hr />
        <GameFeed games={gamesList} onRemoveGame={removeGameHandler}/>
      </Fragment>
    );
  } else {
    domContent = (
      <Fragment>
        <MaterialAppBar click={toggleGameFeed} btnText={buttonText} />
        <GameForm toggle={toggleGameFeed}/>
      </Fragment>
    );
  }

  return domContent;
};

export default Games;
