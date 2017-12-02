import { find, isEmpty, sortBy, filter, get } from "lodash";

import fetch from "../utils/fetch";
import * as c from "./constants";
import { signOut } from "./appActions";

export const setActiveGame = activeGame => ({
  type: c.GAMES,
  payload: { activeGame }
});

export const getGames = () => async (dispatch, getState) => {
  clearTimeout(window.timeout);
  window.timeout = setTimeout(() => dispatch(signOut()), c.SIGN_OUT_TIME);
  try {
    const response = await fetch("/~xbazik00/IIS/api/hra/read.php");

    if (response.status === 200) {
      const content = await response.json();

      const filterAll = getState().filter;

      const list = !isEmpty(content.items)
        ? sortBy(
            filter(
              content.items,
              c =>
                get(c, filterAll.select) &&
                get(c, filterAll.select).indexOf(filterAll.search) !== -1
            ),
            [filterAll.select]
          )
        : content.items;

      if (!filterAll.ascDesc) list.reverse();

      dispatch({
        type: c.GAMES,
        payload: { list, count: content.count }
      });
    }

    return response.status === 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getGame = name => async (dispatch, getState) => {
  clearTimeout(window.timeout);
  window.timeout = setTimeout(() => dispatch(signOut()), c.SIGN_OUT_TIME);

  const activeGame = find(getState().games.list, game => game.name === name);

  dispatch(setActiveGame(activeGame));
};

export const deleteGame = name => async dispatch => {
  clearTimeout(window.timeout);
  window.timeout = setTimeout(() => dispatch(signOut()), c.SIGN_OUT_TIME);
  try {
    const response = await fetch("/~xbazik00/IIS/api/hra/deleteOne.php", {
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

export const newGame = (
  name,
  genre,
  publisher,
  modes,
  created
) => async dispatch => {
  clearTimeout(window.timeout);
  window.timeout = setTimeout(() => dispatch(signOut()), c.SIGN_OUT_TIME);
  try {
    const response = await fetch("/~xbazik00/IIS/api/hra/create.php", {
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

export const updateGame = (
  name,
  genre,
  publisher,
  modes,
  created
) => async dispatch => {
  clearTimeout(window.timeout);
  window.timeout = setTimeout(() => dispatch(signOut()), c.SIGN_OUT_TIME);
  try {
    const response = await fetch("/~xbazik00/IIS/api/hra/update.php", {
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
