import * as c from "../actions/constants";
import * as storage from "../utils/storage";

const initialState = {
  sample: {},
  form: {
    activeForm: null,
    activeFormData: null
  },
  user: null,
  role: JSON.parse(storage.get("role")) || []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case c.CONSTANT:
      return { ...state, ...action.payload };
    case c.APP:
      return { ...state, ...action.payload };
    case c.APP_FORM:
      return { ...state, form: { ...state.form, ...action.payload } };
    default:
      return state;
  }
};

export default reducer;
