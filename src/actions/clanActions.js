import fetch from "../utils/fetch";
import * as c from "./constants";

export const createClan = (
  tag,
  name,
  logo,
  anthem,
  country,
  boss
) => async () => {
  try {
    const response = await fetch("/api/klan/create.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ tag, name, logo, anthem, country, boss })
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

export const getClan = tag => async dispatch => {
  try {
    const response = await fetch("/api/klan/readOne.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ tag })
    });

    if (response.status === 200) {
      const content = await response.json();

      if (!content.error) {
        dispatch({
          type: c.CLAN,
          payload: { activeClan: content }
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

export const inviteUser = (tag, userName) => async () => {
  try {
    const response = await fetch("/api/pozvanka_do_klanu/create.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ tag, userName })
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
