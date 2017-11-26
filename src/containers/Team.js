import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle, withState } from "recompose";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import { Card, CardText } from "react-md";
import { Button, Nav, NavItem } from "react-bootstrap";

import Header from "../components/Header";
import TeamHeader from "../components/team/Header";
import Info from "../components/team/Info";
import Table from "../components/team/Table";
import TournamentTable from "../components/tournaments/Table";

import { getTeam } from "../actions/teamActions";
import { setDialog } from "../actions/appActions";
import { getClan } from "../actions/clanActions";
import { getTournaments } from "../actions/tournamentActions";

const Team = ({
  history,
  activeTeam,
  user,
  activeClan,
  setDialog,
  tableState,
  setTableState,
  tournament,
  getTournaments
}) => {
  return (
    <div>
      <Header history={history} />
      {activeTeam && (
        <div className="container">
          <TeamHeader team={activeTeam} user={user} clan={activeClan} />
          <div className="flex-row flex-center margin-bottom">
            <Card>
              <CardText>
                <Info history={history} team={activeTeam} />
              </CardText>
            </Card>
          </div>
          <div className="flex-row flex-center margin-bottom">
            <Card>
              <Nav
                bsStyle="pills"
                activeKey={tableState ? 1 : 2}
                onSelect={value => setTableState(value === 1)}
              >
                <NavItem eventKey={1}>Uživatelé</NavItem>
                <NavItem eventKey={2}>Turnaje</NavItem>
              </Nav>
              {tableState ? (
                <CardText>
                  <h3>Uživatelé</h3>
                  <div
                    className={classNames({
                      "margin-bottom-small": user.userName === activeClan.boss
                    })}
                  >
                    <Table
                      history={history}
                      team={activeTeam}
                      user={user}
                      clan={activeClan}
                    />
                  </div>
                  {user.userName === activeClan.boss && (
                    <div className="flex-row flex-center">
                      <Button
                        bsStyle="primary"
                        onClick={() =>
                          setDialog("InviteUserToTeam", {
                            name: activeTeam.name
                          })
                        }
                      >
                        Pozvat uživatele
                      </Button>
                    </div>
                  )}
                </CardText>
              ) : (
                <CardText>
                  <h3>Turnaje</h3>
                  <div
                    className={classNames({
                      "margin-bottom-small": user.userName === activeClan.boss
                    })}
                  >
                    <TournamentTable
                      history={history}
                      tournaments={activeTeam.tourneys}
                      user={user}
                    />
                  </div>
                  {user.userName === activeClan.boss && (
                    <div className="flex-row flex-center">
                      <Button
                        bsStyle="primary"
                        onClick={() => {
                          getTournaments();
                          setDialog("AddTeamToTournament", {
                            name: activeTeam.name
                          });
                        }}
                      >
                        Vstoupit do turnaje
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
    ({
      app: { user },
      team: { activeTeam },
      clan: { activeClan },
      tournament
    }) => ({
      user,
      activeTeam,
      activeClan,
      tournament
    }),
    {
      getTeam,
      setDialog,
      getClan,
      getTournaments
    }
  ),
  withState("tableState", "setTableState", true),
  lifecycle({
    async componentDidMount() {
      const { getTeam, match, getClan, user } = this.props;

      getClan(user.clan);
      await getTeam(match.params.name);
    }
  })
)(Team);
