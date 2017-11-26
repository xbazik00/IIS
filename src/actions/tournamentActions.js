import { isEmpty, sortBy, filter, get } from "lodash";

import fetch from "../utils/fetch";
import * as c from "./constants";

export const getTournaments = () => async (dispatch, getState) => {
  try {
    const response = await fetch("/api/turnaj/read.php");

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
) => async () => {
  try {
    const response = await fetch("/api/turnaj/create.php", {
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

export const deleteTournament = id => async () => {
  try {
    const response = await fetch("/api/turnaj/delete.php", {
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
