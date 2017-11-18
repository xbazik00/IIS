import fetch from "../utils/fetch";
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
