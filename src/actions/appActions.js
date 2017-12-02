import { reset } from "redux-form";

import * as c from "./constants";
import * as storage from "../utils/storage";

import { getUser } from "./usersActions";

export const setSample = () => ({
  type: c.CONSTANT,
  payload: { sample: true }
});

export const setActiveForm = (activeForm, activeFormData = null) => ({
  type: c.APP_FORM,
  payload: { activeForm, activeFormData }
});

export const resetForm = form => dispatch => dispatch(reset(form));

export const setDialog = (name, data) => ({
  type: c.DIALOG,
  payload: {
    name,
    data
  }
});

export const closeDialog = () => ({
  type: c.DIALOG,
  payload: { name: null, data: null }
});

export const signIn = (userName, password) => async dispatch => {
  window.timeout = setTimeout(() => dispatch(signOut()), c.SIGN_OUT_TIME);
  try {
    const response = await fetch("/api/signIn.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ userName, password })
    });

    if (response.status === 200) {
      const content = await response.json();

      if (content.userName) {
        dispatch(getUser(content.userName));

        return true;
      }
    }

    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const signOut = () => async dispatch => {
  dispatch({
    type: c.APP,
    payload: { user: null }
  });
  dispatch(closeDialog());
  storage.remove("user");
};

export const setFilter = filter => ({
  type: c.FILTER,
  payload: filter
});
