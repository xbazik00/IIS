import * as c from "../actions/constants";

const initialState = {
  list: [
    { id: "1", name: "Fotbal", type: "BALL_GAME" },
    { id: "2", name: "Basketbal", type: "BALL_GAME" },
    { id: "3", name: "Hokej", type: "BALL_GAME" },
    { id: "4", name: "Hra", type: "GAME" },
    { id: "5", name: "Hra", type: "GAME" },
    { id: "6", name: "Hra", type: "GAME" },
    { id: "7", name: "Hra", type: "GAME" },
    { id: "8", name: "Hra", type: "GAME" }
  ],
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
