import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import { withRouter } from "react-router-dom";

import Header from "../components/Header";
import ContainerHeader from "../components/ContainerHeader";
import Info from "../components/user/Info";

import { getUserByUserName } from "../actions/usersActions";

const User = ({ history, activeUser }) => {
  if (!activeUser) return <div />;
  return (
    <div>
      <Header history={history} />
      <div className="container">
        <ContainerHeader title={activeUser.userName} />
        <Info history={history} user={activeUser} />
      </div>
    </div>
  );
};

export default compose(
  withRouter,
  connect(({ users: { activeUser } }) => ({ activeUser }), {
    getUserByUserName
  }),
  lifecycle({
    async componentDidMount() {
      const { getUserByUserName, match } = this.props;
      await getUserByUserName(match.params.userName);
    }
  })
)(User);
