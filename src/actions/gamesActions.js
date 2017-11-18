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
