import { combineReducers } from "redux";

import { reducer as form } from "redux-form";

import app from "./appReducer";
import games from "./gamesReducer";
import users from "./usersReducer";
import clan from "./clanReducer";
import team from "./teamReducer";
import sponsor from "./sponsorReducer";

export default combineReducers({
  form,
  app,
  games,
  users,
  clan,
  team,
  sponsor
});
