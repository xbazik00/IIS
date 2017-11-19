import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import { Card, CardText } from "react-md";

import Header from "../components/Header";
import ContainerHeader from "../components/ContainerHeader";
import UsersTable from "../components/admin/UsersTable";

import { getUsers } from "../actions/usersActions";

const Admin = ({ history, users }) => {
  return (
    <div>
      <Header history={history} />
      <div className="container">
        <ContainerHeader title="Admin zone" />
        <Card className="margin-bottom">
          <CardText>
            <h3>Uživatelé</h3>
            <UsersTable history={history} users={users.list} />
          </CardText>
        </Card>
      </div>
    </div>
  );
};

export default compose(
  connect(
    ({ users }) => ({
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
)(Admin);
