import * as c from "../actions/constants";

const initialState = {
  list: null,
  count: 0,
  activeTeam: null,
  invitations: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case c.TEAM:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default reducer;
