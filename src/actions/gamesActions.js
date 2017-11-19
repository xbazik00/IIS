import fetch from "../utils/fetch";
import { find } from "lodash";

import * as c from "./constants";

export const setActiveGame = activeGame => ({
  type: c.GAMES,
  payload: { activeGame }
});

export const getGames = () => async dispatch => {
  try {
    const response = await fetch("/api/hra/read.php");

    if (response.status === 200) {
      const content = await response.json();

      dispatch({
        type: c.GAMES,
        payload: { list: content.items, count: content.count }
      });
    }

    return response.status === 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getGame = name => async (dispatch, getState) => {
  const activeGame = find(getState().games.list, game => game.name === name);

  dispatch(setActiveGame(activeGame));
};

export const deleteGame = name => async () => {
  try {
    const response = await fetch("/api/hra/deleteOne.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ name })
    });

    if (response.status === 200) {
      const content = await response.json();

      if (content.message === "OK") {
        return true;
      }
    }

    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const newGame = (name, genre, publisher, modes, created) => async () => {
  try {
    const response = await fetch("/api/hra/create.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        name,
        genre,
        publisher,
        modes,
        created
      })
    });

    if (response.status === 200) {
      const content = await response.json();

      if (content.message === "OK") {
        return true;
      }
    }

    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};
