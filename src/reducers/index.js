import { combineReducers } from "redux";

import { reducer as form } from "redux-form";

import app from "./appReducer";
import games from "./gamesReducer";
import users from "./usersReducer";

export default combineReducers({
  form,
  app,
  games,
  users
});
