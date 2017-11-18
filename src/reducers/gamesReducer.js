import * as c from "../actions/constants";

const initialState = {
  list: null,
  count: 0,
  activeGame: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case c.GAMES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default reducer;
