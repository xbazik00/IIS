import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import { Card, CardText } from "react-md";

import Header from "../components/Header";
import ContainerHeader from "../components/ContainerHeader";
import Table from "../components/users/Table";

import { getUsers } from "../actions/usersActions";

const Users = ({ history, users, user }) => {
  return (
    <div>
      <Header history={history} />
      <div className="container">
        <ContainerHeader title="Uživatelé" />
        <Card className="margin-bottom">
          <CardText>
            <Table history={history} users={users.list} user={user} />
          </CardText>
        </Card>
      </div>
    </div>
  );
};

export default compose(
  connect(
    ({ app: { user }, users }) => ({
      user,
      users
    }),
    { getUsers }
  ),
  lifecycle({
    async componentDidMount() {
      const { getUsers } = this.props;
      await getUsers();
    }
  })
)(Users);
