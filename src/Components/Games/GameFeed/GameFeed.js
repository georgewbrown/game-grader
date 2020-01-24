import React, { memo } from 'react';
import MaterialCard from '../../UI/Material-Card/MaterialCard';
import './GameFeed.css';

const GameFeed = props => {
  const convertPlayerRating = playerRating => {
    switch (true) {
      case playerRating === '5':
        playerRating = '⭐️ ⭐️ ⭐️ ⭐️ ⭐️';
        break;
      case playerRating === '4':
        playerRating = '⭐️ ⭐️ ⭐️ ⭐️';
        break;
      case playerRating === '3':
        playerRating = '⭐️ ⭐️ ⭐️';
        break;
      case playerRating === '2':
        playerRating = '⭐️ ⭐️';
        break;
      default:
        playerRating = '⭐️';
    }
    return playerRating;
  };

  const convertEsrbRating = esrbRating => {
    switch (true) {
      case esrbRating === 'E':
        esrbRating = 'https://www.esrb.org/wp-content/uploads/2019/05/E.svg';
        break;
      case esrbRating === 'E10+':
        esrbRating =
          'https://www.esrb.org/wp-content/uploads/2019/05/E10plus.svg';
        break;
      case esrbRating === 'T':
        esrbRating = 'https://www.esrb.org/wp-content/uploads/2019/05/T.svg';
        break;
      case esrbRating === 'M':
        esrbRating = 'https://www.esrb.org/wp-content/uploads/2019/05/M.svg';
        break;
      default:
        esrbRating = 'https://www.esrb.org/wp-content/uploads/2019/05/AO.svg';
    }
    return esrbRating;
  };

  return (
    <div>
      {props.games.map(game => (
        <div key={game.id} className="feedItem">
          <MaterialCard
            title={game.title}
            esrbRating={convertEsrbRating(game.esrbRating)}
            playerRating={convertPlayerRating(game.playerRating)}
            image={game.imageURL}
            description={game.description}
            removeItem={props.onRemoveGame.bind(this, game.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default memo(GameFeed);
