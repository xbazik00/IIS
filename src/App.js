import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { get } from "lodash";

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
import Tournament from "./containers/Tournament";
import Clans from "./containers/Clans";

import { signOut } from "./actions/appActions";
import { getUser } from "./actions/usersActions";
import { getClan } from "./actions/clanActions";
import { SIGN_OUT_TIME } from "./actions/constants";

import { isAdmin } from "./utils";

const App = ({ store, user }) => {
  const admin = user && isAdmin(user.role);
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Dialogs />
          <Route exact path="/" component={SignIn} />
          {get(user, "userName") ? (
            <div>
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
              <Route path="/tournaments" component={Tournaments} />
              <Route path="/tournament/:id" component={Tournament} />
              {admin && <Route path="/clans" component={Clans} />}
              {admin && <Route path="/sponsors" component={Sponsors} />}
            </div>
          ) : (
            <Redirect to="/" />
          )}
        </div>
      </Router>
    </Provider>
  );
};

export default compose(
  connect(({ app: { user } }) => ({ user }), { getUser, getClan, signOut }),
  lifecycle({
    async componentWillMount() {
      const { user, getUser, getClan, signOut } = this.props;
      if (user && user.userName) {
        window.timeout = setTimeout(() => signOut(), SIGN_OUT_TIME);
        await getUser(user.userName);
      }
      if (user && user.clan) await getClan(user.clan);
    }
  })
)(App);
