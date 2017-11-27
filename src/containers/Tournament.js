import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle, withState } from "recompose";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import { Card, CardText } from "react-md";
import { Button, Nav, NavItem } from "react-bootstrap";

import Header from "../components/Header";
import TournamentHeader from "../components/tournament/Header";
import Info from "../components/tournament/Info";
import Table from "../components/tournament/Table";
import MatchTable from "../components/tournament/MatchTable";
import SponsorsTable from "../components/sponsor/Table";

import { getTournament } from "../actions/tournamentActions";
import { setDialog, setFilter } from "../actions/appActions";
import { getTournamentSponsors, getSponsors } from "../actions/sponsorActions";

import { isOrganizer } from "../utils";

const Tournament = ({
  history,
  activeTournament,
  user,
  setDialog,
  tableState,
  setTableState,
  sponsor,
  getSponsors,
  setFilter
}) => {
  const organizer = user && isOrganizer(user.role);
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
              <Nav
                bsStyle="pills"
                activeKey={tableState}
                onSelect={value => setTableState(value)}
              >
                <NavItem eventKey={1}>Týmy</NavItem>
                <NavItem eventKey={2}>Zápasy</NavItem>
                <NavItem eventKey={3}>Sponzoři</NavItem>
              </Nav>
              {tableState === 1 ? (
                <CardText>
                  <h3>Týmy</h3>
                  <Table
                    history={history}
                    tournament={activeTournament}
                    user={user}
                  />
                </CardText>
              ) : tableState === 2 ? (
                <CardText>
                  <h3>Zápasy</h3>
                  <div
                    className={classNames({
                      "margin-bottom-small":
                        organizer &&
                        activeTournament.id_organizer === user.userName
                    })}
                  >
                    <MatchTable
                      history={history}
                      matches={activeTournament.matches}
                      user={user}
                      tournament={activeTournament}
                    />
                  </div>
                  {organizer &&
                    activeTournament.id_organizer === user.userName && (
                      <div className="flex-row flex-center">
                        <Button
                          bsStyle="primary"
                          onClick={() =>
                            setDialog("NewMatch", {
                              id: activeTournament.id
                            })
                          }
                        >
                          Přidat zápas
                        </Button>
                      </div>
                    )}
                </CardText>
              ) : (
                <CardText>
                  <h3>Sponzoři</h3>
                  <div
                    className={classNames({
                      "margin-bottom-small":
                        organizer &&
                        activeTournament.id_organizer === user.userName
                    })}
                  >
                    <SponsorsTable
                      history={history}
                      sponsors={sponsor.tournamentSponsors.list}
                      user={user}
                      tournament={activeTournament}
                      tournamentSponsors
                    />
                  </div>
                  {organizer &&
                    activeTournament.id_organizer === user.userName && (
                      <div className="flex-row flex-center">
                        <Button
                          bsStyle="primary"
                          onClick={() => {
                            setFilter({
                              select: "acronym",
                              ascDesc: true,
                              search: ""
                            });
                            getSponsors();
                            setDialog("AddSponsorToTournament", {
                              id: activeTournament.id
                            });
                          }}
                        >
                          Přidat sponzora turnaje
                        </Button>
                      </div>
                    )}
                </CardText>
              )}
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
    ({ app: { user }, tournament: { activeTournament }, sponsor }) => ({
      user,
      activeTournament,
      sponsor
    }),
    {
      getTournament,
      setDialog,
      getTournamentSponsors,
      getSponsors,
      setFilter
    }
  ),
  withState("tableState", "setTableState", 1),
  lifecycle({
    async componentDidMount() {
      const { getTournament, match, getTournamentSponsors } = this.props;
      await getTournament(match.params.id);
      await getTournamentSponsors(match.params.id);
    }
  })
)(Tournament);
