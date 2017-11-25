import * as c from "../actions/constants";

const initialState = {
  select: "name",
  ascDesc: true,
  search: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case c.FILTER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default reducer;
