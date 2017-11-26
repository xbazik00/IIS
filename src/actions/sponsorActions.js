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

export const getSponsors = () => async dispatch => {
  try {
    const response = await fetch("/api/sponzor/read.php");

    if (response.status === 200) {
      const content = await response.json();

      dispatch({
        type: c.SPONSOR,
        payload: { list: content.items, count: content.count }
      });

      return true;
    }

    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};
