import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import Route from "./Route";
import Dialogs from "./containers/Dialogs";
import SignIn from "./containers/SignIn";
import Main from "./containers/Main";
import Profile from "./containers/Profile";
import Game from "./containers/Game";
import Admin from "./containers/Admin";

import { isAdmin } from "./utils";

const App = ({ store, user }) => {
  const admin = user ? isAdmin(user.role) : false;
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Dialogs />
          <Route exact path="/" component={SignIn} />
          <Route exact path="/main" component={Main} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/games/:id" component={Game} />
          {admin && <Route path="/admin" component={Admin} />}
        </div>
      </Router>
    </Provider>
  );
};

export default compose(
  connect(({ app: { user } }) => ({ user }), null),
  lifecycle({
    componentWillMount() {}
  })
)(App);
