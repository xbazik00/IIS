import { find } from "lodash";

import * as c from "./constants";

export const setActiveGame = activeGame => ({
  type: c.GAMES,
  payload: { activeGame }
});

export const getGame = id => async (dispatch, getState) => {
  const activeGame = find(getState().games.list, game => game.id === id);

  dispatch(setActiveGame(activeGame));
};
