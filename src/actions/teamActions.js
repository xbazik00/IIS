import fetch from "../utils/fetch";
import * as c from "./constants";

export const createTeam = (name, userName, game) => async () => {
  try {
    const response = await fetch("/api/tym/create.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ name, userName, game })
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

export const deleteTeam = name => async () => {
  try {
    const response = await fetch("/api/tym/delete.php", {
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
  try {
    const response = await fetch("/api/pozvanka_do_tymu/read.php", {
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