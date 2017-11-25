import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import { Card, CardText } from "react-md";

import Header from "../components/Header";
import ContainerHeader from "../components/ContainerHeader";
import Table from "../components/teams/Table";

import { getTeamsByUserName } from "../actions/teamActions";

const Teams = ({ history, team, user }) => {
  return (
    <div>
      <Header history={history} />
      <div className="container">
        <ContainerHeader title="Týmy" />
        <Card className="margin-bottom">
          <CardText>
            <Table history={history} teams={team.list} user={user} />
          </CardText>
        </Card>
      </div>
    </div>
  );
};

export default compose(
  connect(
    ({ app: { user }, team }) => ({
      user,
      team
    }),
    { getTeamsByUserName }
  ),
  lifecycle({
    async componentDidMount() {
      const { getTeamsByUserName, user } = this.props;
      await getTeamsByUserName(user.userName);
    }
  })
)(Teams);
