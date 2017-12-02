import { isEmpty, sortBy, filter, get } from "lodash";

import fetch from "../utils/fetch";
import * as c from "./constants";
import { signOut } from "./appActions";

export const getMatches = () => async (dispatch, getState) => {
  clearTimeout(window.timeout);
  window.timeout = setTimeout(() => dispatch(signOut()), c.SIGN_OUT_TIME);
  try {
    const response = await fetch("/~xbazik00/IIS/api/zapas/read.php");

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
        type: c.MATCH,
        payload: { list, count: content.count }
      });
    }

    return response.status === 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const newMatch = (
  result,
  date,
  id_tourney,
  name1,
  name2
) => async dispatch => {
  clearTimeout(window.timeout);
  window.timeout = setTimeout(() => dispatch(signOut()), c.SIGN_OUT_TIME);
  try {
    const response = await fetch("/~xbazik00/IIS/api/zapas/create.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        result,
        date,
        id_tourney,
        name1,
        name2
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

export const deleteMatch = id => async dispatch => {
  clearTimeout(window.timeout);
  window.timeout = setTimeout(() => dispatch(signOut()), c.SIGN_OUT_TIME);
  try {
    const response = await fetch("/~xbazik00/IIS/api/zapas/deleteOne.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        id
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
