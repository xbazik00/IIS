import { combineReducers } from "redux";

import { reducer as form } from "redux-form";

import app from "./appReducer";
import games from "./gamesReducer";

export default combineReducers({
  form,
  app,
  games
});
