import { isEmpty, sortBy, filter, get } from "lodash";

import fetch from "../utils/fetch";
import * as c from "./constants";
import { signOut } from "./appActions";

export const getTournaments = () => async (dispatch, getState) => {
  clearTimeout(window.timeout);
  window.timeout = setTimeout(() => dispatch(signOut()), c.SIGN_OUT_TIME);
  try {
    const response = await fetch("/~xbazik00/IIS/api/turnaj/read.php");

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
        type: c.TOURNAMENT,
        payload: { list, count: content.count }
      });
    }

    return response.status === 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const createTournament = (
  name,
  date,
  prize,
  game,
  winner,
  id_organizer
) => async dispatch => {
  clearTimeout(window.timeout);
  window.timeout = setTimeout(() => dispatch(signOut()), c.SIGN_OUT_TIME);
  try {
    const response = await fetch("/~xbazik00/IIS/api/turnaj/create.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ name, date, prize, game, winner, id_organizer })
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

export const deleteTournament = id => async dispatch => {
  clearTimeout(window.timeout);
  window.timeout = setTimeout(() => dispatch(signOut()), c.SIGN_OUT_TIME);
  try {
    const response = await fetch("/~xbazik00/IIS/api/turnaj/delete.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ id })
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

export const getTournament = id => async dispatch => {
  clearTimeout(window.timeout);
  window.timeout = setTimeout(() => dispatch(signOut()), c.SIGN_OUT_TIME);
  try {
    const response = await fetch("/~xbazik00/IIS/api/turnaj/readOne.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ id })
    });

    if (response.status === 200) {
      const content = await response.json();

      if (!content.error) {
        dispatch({
          type: c.TOURNAMENT,
          payload: { activeTournament: content }
        });
        return true;
      }
    }

    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const updateTournament = (
  id,
  name,
  date,
  prize,
  game,
  winner,
  id_organizer
) => async dispatch => {
  clearTimeout(window.timeout);
  window.timeout = setTimeout(() => dispatch(signOut()), c.SIGN_OUT_TIME);
  try {
    const response = await fetch("/~xbazik00/IIS/api/turnaj/update.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        id,
        name,
        date,
        prize,
        game,
        winner,
        id_organizer
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

export const addTeamToTournament = (id, name) => async dispatch => {
  clearTimeout(window.timeout);
  window.timeout = setTimeout(() => dispatch(signOut()), c.SIGN_OUT_TIME);
  try {
    const response = await fetch("/~xbazik00/IIS/api/tymy_v_turnaji/add.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        id,
        name
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

export const deleteTeamFromTournament = (id, name) => async dispatch => {
  clearTimeout(window.timeout);
  window.timeout = setTimeout(() => dispatch(signOut()), c.SIGN_OUT_TIME);
  try {
    const response = await fetch("/~xbazik00/IIS/api/tymy_v_turnaji/deleteOne.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        id,
        name
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
