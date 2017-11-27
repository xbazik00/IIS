import { isEmpty, sortBy, get, filter } from "lodash";

import fetch from "../utils/fetch";
import * as c from "./constants";

export const getClans = () => async (dispatch, getState) => {
  try {
    const response = await fetch("/api/klan/read.php");

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
        type: c.CLAN,
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

export const updateClan = (tag, name, logo, anthem, country) => async () => {
  try {
    const response = await fetch("/api/klan/update.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ tag, name, logo, anthem, country })
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

export const getInvitations = userName => async dispatch => {
  try {
    const response = await fetch("/api/pozvanka_do_klanu/read.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ userName })
    });

    if (response.status === 200) {
      const content = await response.json();

      dispatch({
        type: c.CLAN,
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

export const deleteClan = tag => async () => {
  try {
    const response = await fetch("/api/klan/delete.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ tag })
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

export const deleteUserFromClan = (tag, userName) => async () => {
  try {
    const response = await fetch("/api/uzivatele_v_klanu/deleteOne.php", {
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

export const acceptInvitation = (tag, userName) => async () => {
  try {
    const response = await fetch("/api/pozvanka_do_klanu/accept.php", {
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

export const deleteInvitation = (tag, userName) => async () => {
  try {
    const response = await fetch("/api/pozvanka_do_klanu/delete.php", {
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
