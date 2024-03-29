import * as c from "../actions/constants";

const initialState = {
  list: null,
  count: 0,
  activeUser: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case c.USERS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default reducer;
