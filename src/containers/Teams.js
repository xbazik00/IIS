import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import { Card, CardText } from "react-md";

import Header from "../components/Header";
import ContainerHeader from "../components/ContainerHeader";
import Table from "../components/teams/Table";
import Filter from "../components/Filter";

import { setFilter } from "../actions/appActions";
import { getTeamsByUserName, getTeams } from "../actions/teamActions";

import { isAdmin } from "../utils";

const Teams = ({
  history,
  team,
  user,
  activeClan,
  getTeams,
  getTeamsByUserName
}) => {
  return (
    <div>
      <Header history={history} />
      <div className="container">
        <ContainerHeader title="Týmy" />
        <div className="margin-bottom">
          <Filter
            selectOptions={[
              { label: "Název", value: "name" },
              { label: "Maximální počet hráčů", value: "number_of_players" }
            ]}
            handleUpdate={() => {
              if (isAdmin(user.role)) getTeams();
              else getTeamsByUserName(user.userName);
            }}
          />
        </div>
        <Card className="margin-bottom">
          <CardText>
            <Table
              history={history}
              teams={team.list}
              user={user}
              clan={activeClan}
            />
          </CardText>
        </Card>
      </div>
    </div>
  );
};

export default compose(
  connect(
    ({ app: { user }, team, clan: { activeClan } }) => ({
      user,
      team,
      activeClan
    }),
    { getTeamsByUserName, getTeams, setFilter }
  ),
  lifecycle({
    async componentDidMount() {
      const { getTeamsByUserName, user, getTeams, setFilter } = this.props;

      setFilter({ select: "name", ascDesc: true, search: "" });
      if (isAdmin(user.role)) getTeams();
      else getTeamsByUserName(user.userName);
    }
  })
)(Teams);
