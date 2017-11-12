import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import Dialogs from "./containers/Dialogs";
import SignIn from "./containers/SignIn";
import Main from "./containers/Main";
import Profile from "./containers/Profile";
import Game from "./containers/Game";

const App = ({ store }) => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Dialogs />
          <Route exact path="/" component={SignIn} />
          <Route exact path="/main" component={Main} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/games/:id" component={Game} />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
