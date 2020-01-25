import React, { useEffect, useState, memo } from 'react';
import { makeStyles, NativeSelect, FormControl } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 500,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));


const Filter = props => {
    const { onFilter } = props;
    const classes = useStyles();
    const firebaseURL = `https://game-grade.firebaseio.com/games.json`;
    const [filterState, setFilterState] = useState({
        playerRating: '',
        esrbRating: ''
    });

    useEffect(() => {
        async function fetchData() {
          await axios(firebaseURL)
            .then(res => {
            const responseData = res.data;
            const loadedGames = [];
            for (const key in responseData) {
                loadedGames.push({
                id: key,
                title: responseData[key].title,
                esrbRating: responseData[key].esrbRating,
                playerRating: responseData[key].playerRating,
                imageURL: responseData[key].imageURL,
                description: responseData[key].description
                });
            }

            if (filterState.playerRating === '' && filterState.esrbRating === '') {
                const filteredGames = loadedGames;
                onFilter(filteredGames);
            } else if (filterState.playerRating === '') {
                const filteredGames = loadedGames.filter(game => game.esrbRating === filterState.esrbRating);
                onFilter(filteredGames);
            } else if (filterState.esrbRating === '') {
                const filteredGames = loadedGames.filter(game => game.playerRating === filterState.playerRating);
                onFilter(filteredGames);
            } else {
            const filteredGames = loadedGames.filter(game =>
                game.playerRating === filterState.playerRating
                && game.esrbRating === filterState.esrbRating
            );
            onFilter(filteredGames);
            }
            }).catch(err => {
              console.error(err);
              });
        }
        fetchData();
      }, [onFilter, filterState, firebaseURL]);

    const handleChange = name => event => {
        setFilterState({
            ...filterState,
            [name]: event.target.value,
        });
      };

return (
    <div>
       <FormControl className={classes.formControl}>
        <NativeSelect
          value={filterState.playerRating}
          onChange={handleChange('playerRating')}
        >
        <option value="">No Filter</option>
        <option value="5">5 - ⭐️⭐️⭐️⭐️⭐️</option>
        <option value="4">4 - ⭐️⭐️⭐️⭐️</option>
        <option value="3">3 - ⭐️⭐️⭐️</option>
        <option value="2">2 - ⭐️⭐️</option>
        <option value="1">1 - ⭐️</option>
        </NativeSelect>
        </FormControl>
        <FormControl className={classes.formControl}>
        <NativeSelect
          value={filterState.esrbRating}
          onChange={handleChange('esrbRating')}
        >
        <option value="">No Filter</option>
        <option value="E">E - Everyone</option>
        <option value="E10+">E10+ - Everyone 10+</option>
        <option value="T">T - Teen</option>
        <option value="M">M - Mature 17+</option>
        <option value="Ao">Ao - Adults Only 18+</option>
        <option value="RP">RP - Rating Pending</option>
        </NativeSelect>
      </FormControl>
    </div>
  );
}

export default memo(Filter);