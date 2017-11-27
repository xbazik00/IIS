import { isEmpty, sortBy, get, filter } from "lodash";

import fetch from "../utils/fetch";
import * as c from "./constants";

export const createSponsor = (
  acronym,
  name,
  seat,
  account_number
) => async () => {
  try {
    const response = await fetch("/api/sponzor/create.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ acronym, name, seat, account_number })
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

export const deleteSponsor = acronym => async () => {
  try {
    const response = await fetch("/api/sponzor/deleteOne.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ acronym })
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

export const getSponsors = () => async (dispatch, getState) => {
  try {
    const response = await fetch("/api/sponzor/read.php");

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
        type: c.SPONSOR,
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

export const getSponsorsByClanTag = tag => async dispatch => {
  try {
    const response = await fetch("/api/sponzor_klanu/read.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ tag })
    });

    if (response.status === 200) {
      const content = await response.json();

      dispatch({
        type: c.SPONSOR,
        payload: {
          clanSponsors: { list: content.items, count: content.count }
        }
      });

      return true;
    }

    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const addSponsorToClan = (acronym, tag) => async () => {
  try {
    const response = await fetch("/api/sponzor_klanu/add.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ acronym, tag })
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

export const deleteSponsorFromClan = (acronym, tag) => async () => {
  try {
    const response = await fetch("/api/sponzor_klanu/delete.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ acronym, tag })
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

export const getTournamentSponsors = id => async dispatch => {
  try {
    const response = await fetch("/api/sponzor_turnaje/read.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ id })
    });

    if (response.status === 200) {
      const content = await response.json();

      dispatch({
        type: c.SPONSOR,
        payload: {
          tournamentSponsors: { list: content.items, count: content.count }
        }
      });

      return true;
    }

    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const deleteSponsorFromTournament = (acronym, id) => async () => {
  try {
    const response = await fetch("/api/sponzor_turnaje/delete.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ acronym, id })
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

export const addSponsorToTournament = (acronym, id) => async () => {
  try {
    const response = await fetch("/api/sponzor_turnaje/add.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ acronym, id })
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
