import { isEmpty, sortBy, get, filter } from "lodash";

import fetch from "../utils/fetch";
import * as c from "./constants";
import { signOut } from "./appActions";

export const createTeam = (
  name,
  userName,
  game,
  number_of_players
) => async dispatch => {
  clearTimeout(window.timeout);
  window.timeout = setTimeout(() => dispatch(signOut()), c.SIGN_OUT_TIME);
  try {
    const response = await fetch("/~xbazik00/IIS/~xbazik00/IIS/api/tym/create.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ name, userName, game, number_of_players })
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

export const deleteTeam = name => async dispatch => {
  clearTimeout(window.timeout);
  window.timeout = setTimeout(() => dispatch(signOut()), c.SIGN_OUT_TIME);
  try {
    const response = await fetch("/~xbazik00/IIS/api/tym/delete.php", {
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

export const getInvitations = userName => async dispatch => {
  clearTimeout(window.timeout);
  window.timeout = setTimeout(() => dispatch(signOut()), c.SIGN_OUT_TIME);
  try {
    const response = await fetch("/~xbazik00/IIS/api/pozvanka_do_tymu/read.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ userName })
    });

    if (response.status === 200) {
      const content = await response.json();

      dispatch({
        type: c.TEAM,
        payload: { invitations: content }
      });

      return true;
    }

    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getTeams = () => async (dispatch, getState) => {
  clearTimeout(window.timeout);
  window.timeout = setTimeout(() => dispatch(signOut()), c.SIGN_OUT_TIME);
  try {
    const response = await fetch("/~xbazik00/IIS/api/tym/read.php");

    if (response.status === 200) {
      const content = await response.json();

      const filterAll = getState().filter;

      const list =
        !isEmpty(content.items) && get(content.items[0], filterAll.select)
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
        type: c.TEAM,
        payload: { list, count: content.count }
      });

      return true;
    }

    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getTeamsByUserName = userName => async (dispatch, getState) => {
  clearTimeout(window.timeout);
  window.timeout = setTimeout(() => dispatch(signOut()), c.SIGN_OUT_TIME);
  try {
    const response = await fetch("/~xbazik00/IIS/api/uzivatele_v_tymech/readTeams.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ userName })
    });

    if (response.status === 200) {
      const content = await response.json();

      const filterAll = getState().filter;

      const list =
        !isEmpty(content.items) && get(content.items[0], filterAll.select)
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
        type: c.TEAM,
        payload: { list, count: content.count }
      });

      return true;
    }

    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getTeam = name => async dispatch => {
  clearTimeout(window.timeout);
  window.timeout = setTimeout(() => dispatch(signOut()), c.SIGN_OUT_TIME);
  try {
    const response = await fetch("/~xbazik00/IIS/api/tym/readOne.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ name })
    });

    if (response.status === 200) {
      const content = await response.json();

      if (content.name) {
        dispatch({
          type: c.TEAM,
          payload: { activeTeam: content }
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

export const inviteUser = (name, userName) => async dispatch => {
  clearTimeout(window.timeout);
  window.timeout = setTimeout(() => dispatch(signOut()), c.SIGN_OUT_TIME);
  try {
    const response = await fetch("/~xbazik00/IIS/api/pozvanka_do_tymu/create.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ name, userName })
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

export const acceptInvitation = (name, userName) => async dispatch => {
  clearTimeout(window.timeout);
  window.timeout = setTimeout(() => dispatch(signOut()), c.SIGN_OUT_TIME);
  try {
    const response = await fetch("/~xbazik00/IIS/api/pozvanka_do_tymu/accept.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ name, userName })
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

export const deleteInvitation = (name, userName) => async dispatch => {
  clearTimeout(window.timeout);
  window.timeout = setTimeout(() => dispatch(signOut()), c.SIGN_OUT_TIME);
  try {
    const response = await fetch("/~xbazik00/IIS/api/pozvanka_do_tymu/delete.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ name, userName })
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

export const deleteUserFromTeam = (name, userName) => async dispatch => {
  clearTimeout(window.timeout);
  window.timeout = setTimeout(() => dispatch(signOut()), c.SIGN_OUT_TIME);
  try {
    const response = await fetch("/~xbazik00/IIS/api/uzivatele_v_tymech/deleteOne.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ name, userName })
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
