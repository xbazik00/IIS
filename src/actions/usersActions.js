import fetch from "../utils/fetch";
import * as storage from "../utils/storage";
import * as c from "./constants";

export const getUsers = () => async dispatch => {
  try {
    const response = await fetch("/api/uzivatel/read.php");

    if (response.status === 200) {
      const content = await response.json();

      dispatch({
        type: c.USERS,
        payload: { list: content.items, count: content.count }
      });
    }

    return response.status === 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getUser = userName => async dispatch => {
  try {
    const response = await fetch("/api/uzivatel/readOne.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ userName })
    });

    if (response.status === 200) {
      const content = await response.json();

      dispatch({
        type: c.APP,
        payload: { user: content }
      });

      storage.set("user", JSON.stringify(content));
    }

    return response.status === 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getUserByUserName = userName => async dispatch => {
  try {
    const response = await fetch("/api/uzivatel/readOne.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ userName })
    });

    if (response.status === 200) {
      const content = await response.json();

      dispatch({
        type: c.USERS,
        payload: { activeUser: content }
      });
    }

    return response.status === 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};
