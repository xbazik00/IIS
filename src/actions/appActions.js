import * as c from "./constants";

export const setSample = () => ({
  type: c.CONSTANT,
  payload: { sample: true }
});

export const setActiveForm = (activeForm, activeFormData = null) => ({
  type: c.APP_FORM,
  payload: { activeForm, activeFormData }
});

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

export const signIn = () => async () => {
  return true;
};

export const signOut = () => async () => {};
