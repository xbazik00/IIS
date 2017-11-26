import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import { withRouter } from "react-router-dom";
import { Card, CardText } from "react-md";

import Header from "../components/Header";
import TeamHeader from "../components/team/Header";
import Info from "../components/team/Info";
import Table from "../components/team/Table";

import { getTeam } from "../actions/teamActions";

const Team = ({ history, activeTeam, user, activeClan }) => {
  return (
    <div>
      <Header history={history} />
      {activeTeam && (
        <div className="container">
          <TeamHeader
            team={activeTeam}
            user={user}
            clan={activeClan}
          />
          <div className="flex-row flex-center margin-bottom">
            <Card>
              <CardText>
                <Info history={history} team={activeTeam} />
              </CardText>
            </Card>
          </div>
          <div className="flex-row flex-center margin-bottom">
            <Card>
              <CardText>
                <h3>Uživatelé</h3>
                <Table
                  history={history}
                  users={activeTeam.users}
                  user={user}
                  clan={activeClan}
                />
              </CardText>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default compose(
  withRouter,
  connect(
    ({ app: { user }, team: { activeTeam }, clan: { activeClan } }) => ({
      user,
      activeTeam,
      activeClan
    }),
    {
      getTeam
    }
  ),
  lifecycle({
    async componentDidMount() {
      const { getTeam, match } = this.props;
      await getTeam(match.params.name);
    }
  })
)(Team);
