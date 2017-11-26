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
import TeamInvitations from "./containers/TeamInvitations";
import User from "./containers/User";
import Sponsors from "./containers/Sponsors";
import Teams from "./containers/Teams";
import Team from "./containers/Team";
import Tournaments from "./containers/Tournaments";

import { getUser } from "./actions/usersActions";
import { getClan } from "./actions/clanActions";

import { isAdmin } from "./utils";

const App = ({ store, user }) => {
  const admin = user && isAdmin(user.role);
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
          <Route path="/team-invitations" component={TeamInvitations} />
          <Route path="/user/:userName" component={User} />
          <Route path="/users" component={Users} />
          <Route path="/teams" component={Teams} />
          <Route path="/team/:name" component={Team} />
          {admin && <Route path="/sponsors" component={Sponsors} />}
          {admin && <Route path="/tournaments" component={Tournaments} />}
        </div>
      </Router>
    </Provider>
  );
};

export default compose(
  connect(({ app: { user } }) => ({ user }), { getUser, getClan }),
  lifecycle({
    async componentWillMount() {
      const { user, getUser, getClan } = this.props;
      if (user && user.userName) await getUser(user.userName);
      if (user && user.clan) await getClan(user.clan);
    }
  })
)(App);
