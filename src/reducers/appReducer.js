import * as c from "../actions/constants";

const initialState = {
  sample: {},
  form: {
    activeForm: null,
    activeFormData: null
  },
  user: {
    firstName: "Jméno",
    surname: "Příjmení",
    userName: "Přezdívka",
    role: "ADMIN",
    country: "CZ",
    notes: "Poznámky trenéra"
  },
  dialog: { name: null, data: null }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case c.CONSTANT:
      return { ...state, ...action.payload };
    case c.APP:
      return { ...state, ...action.payload };
    case c.APP_FORM:
      return { ...state, form: { ...state.form, ...action.payload } };
    case c.DIALOG:
      return { ...state, dialog: action.payload };
    default:
      return state;
  }
};

export default reducer;
