import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import { withRouter } from "react-router-dom";

import Header from "../components/Header";
import UserHeader from "../components/user/Header";
import Info from "../components/user/Info";

import { getUserByUserName } from "../actions/usersActions";

const User = ({ history, activeUser, user }) => {
  return (
    <div>
      <Header history={history} />
      {activeUser && (
        <div className="container">
          <UserHeader user={activeUser} currentUser={user} />
          <Info history={history} user={activeUser} />
        </div>
      )}
    </div>
  );
};

export default compose(
  withRouter,
  connect(
    ({ users: { activeUser }, app: { user } }) => ({ activeUser, user }),
    {
      getUserByUserName
    }
  ),
  lifecycle({
    async componentDidMount() {
      const { getUserByUserName, match } = this.props;
      await getUserByUserName(match.params.userName);
    }
  })
)(User);
