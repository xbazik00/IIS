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
import Users from "./containers/Users";
import Clan from "./containers/Clan";
import ClanInvitations from "./containers/ClanInvitations";
import User from "./containers/User";

import { getUser } from "./actions/usersActions";

const App = ({ store }) => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Dialogs />
          <Route exact path="/" component={SignIn} />
          <Route exact path="/main" component={Main} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/game/:id" component={Game} />
          <Route path="/clan/:tag" component={Clan} />
          <Route path="/clan-invitations" component={ClanInvitations} />
          <Route path="/user/:userName" component={User} />
          <Route path="/users" component={Users} />
        </div>
      </Router>
    </Provider>
  );
};

export default compose(
  connect(null, { getUser }),
  lifecycle({
    componentWillMount() {
      const { user, getUser } = this.props;
      if (user && user.userName) getUser(user.userName);
    }
  })
)(App);
