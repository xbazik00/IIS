import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import { withRouter } from "react-router-dom";
import { Card, CardText } from "react-md";

import Header from "../components/Header";
import TournamentHeader from "../components/tournament/Header";
import Info from "../components/tournament/Info";
import Table from "../components/tournament/Table";

import { getTournament } from "../actions/tournamentActions";
import { setDialog } from "../actions/appActions";

const Tournament = ({ history, activeTournament, user, setDialog }) => {
  return (
    <div>
      <Header history={history} />
      {activeTournament && (
        <div className="container">
          <TournamentHeader tournament={activeTournament} user={user} />
          <div className="flex-row flex-center margin-bottom">
            <Info
              history={history}
              tournament={activeTournament}
              initialValues={activeTournament}
            />
          </div>
          <div className="flex-row flex-center margin-bottom">
            <Card>
              <CardText>
                <h3>Týmy</h3>
                <div>
                  <Table
                    history={history}
                    tournament={activeTournament.teams}
                    user={user}
                  />
                </div>
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
    ({ app: { user }, tournament: { activeTournament } }) => ({
      user,
      activeTournament
    }),
    {
      getTournament,
      setDialog
    }
  ),
  lifecycle({
    async componentDidMount() {
      const { getTournament, match } = this.props;
      await getTournament(match.params.id);
    }
  })
)(Tournament);
