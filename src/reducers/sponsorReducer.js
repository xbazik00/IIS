import * as c from "../actions/constants";

const initialState = {
  list: null,
  count: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case c.SPONSOR:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default reducer;
