import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import { Card, CardText } from "react-md";

import Header from "../components/Header";
import ContainerHeader from "../components/ContainerHeader";
import Filter from "../components/Filter";
import Table from "../components/users/Table";

import { setFilter } from "../actions/appActions";
import { getUsers } from "../actions/usersActions";

const Users = ({ history, users, user, getUsers }) => {
  return (
    <div>
      <Header history={history} />
      <div className="container">
        <ContainerHeader title="Uživatelé" />
        <div className="margin-bottom">
          <Filter
            selectOptions={[
              { label: "Přezdívka", value: "userName" },
              { label: "Jméno", value: "firstName" },
              { label: "Příjmení", value: "surname" },
              { label: "Klan", value: "clan" }
            ]}
            handleUpdate={() => getUsers()}
          />
        </div>
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
    { getUsers, setFilter }
  ),
  lifecycle({
    async componentWillMount() {
      const { getUsers, setFilter } = this.props;

      await setFilter({ select: "userName", ascDesc: true, search: "" });
      await getUsers();
    }
  })
)(Users);
