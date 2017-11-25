import { isEmpty, sortBy, get, filter } from "lodash";

import fetch from "../utils/fetch";
import * as storage from "../utils/storage";
import * as c from "./constants";

export const getUsers = () => async (dispatch, getState) => {
  try {
    const response = await fetch("/api/uzivatel/read.php");

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
        type: c.USERS,
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

      if (content.userName) {
        dispatch({
          type: c.APP,
          payload: { user: content }
        });

        storage.set("user", JSON.stringify(content));

        return false;
      }
    }

    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const updateUser = (
  nick,
  name,
  surname,
  country,
  role,
  password
) => async () => {
  try {
    const response = await fetch("/api/uzivatel/update.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ nick, name, surname, country, role, password })
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

      if (content.userName) {
        dispatch({
          type: c.USERS,
          payload: { activeUser: content }
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

export const deleteUser = userName => async dispatch => {
  try {
    const response = await fetch("/api/uzivatel/deleteOne.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ userName })
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
