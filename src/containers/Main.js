import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import { Card, CardText } from "react-md";
import { Button } from "react-bootstrap";

import Header from "../components/Header";
import MainHeader from "../components/main/Header";
import Table from "../components/games/Table";
import ContainerHeader from "../components/ContainerHeader";
import Filter from "../components/Filter";
import TournamentsTable from "../components/tournaments/Table";

import { getGames } from "../actions/gamesActions";
import { setDialog, setFilter } from "../actions/appActions";
import { getClan } from "../actions/clanActions";
import { getTournaments } from "../actions/tournamentActions";

import { isAdmin, isOrganizer } from "../utils";

const Main = ({
  history,
  user,
  setDialog,
  activeClan,
  getGames,
  tournament,
  getTournaments
}) => {
  const admin = user && isAdmin(user.role);
  const organizer = user && isOrganizer(user.role);
  return (
    <div>
      <Header history={history} />
      <div className="container">
        {!admin &&
          !organizer && (
            <div className="margin-bottom">
              <MainHeader history={history} clan={activeClan} />
            </div>
          )}
        <ContainerHeader title={organizer ? "Turnaje" : "Hry"} />
        <div className="margin-bottom">
          <Filter
            selectOptions={
              organizer
                ? [
                    { label: "Název", value: "name" },
                    { label: "Datum konání", value: "date" },
                    { label: "Hlavní cena", value: "prize" },
                    { label: "Hra", value: "game" },
                    { label: "Vítěz", value: "winner" }
                  ]
                : [
                    { label: "Název", value: "name" },
                    { label: "Žánr", value: "genre" },
                    { label: "Vydavatel", value: "publisher" }
                  ]
            }
            handleUpdate={() => {
              if (organizer) getTournaments();
              else getGames();
            }}
          />
        </div>
        <Card className="margin-bottom">
          <CardText>
            <div className="margin-bottom-small">
              {organizer ? (
                <TournamentsTable
                  history={history}
                  user={user}
                  tournaments={tournament.list}
                />
              ) : (
                <Table history={history} user={user} />
              )}
            </div>
            {organizer && (
              <div className="flex-row flex-center">
                <Button
                  bsStyle="primary"
                  onClick={() => setDialog("AddTournament")}
                >
                  Přidat turnaj
                </Button>
              </div>
            )}
            {admin && (
              <div className="flex-row flex-center">
                <Button
                  bsStyle="primary"
                  onClick={() => setDialog("NewGame")}
                >
                  Přidat hru
                </Button>
              </div>
            )}
          </CardText>
        </Card>
      </div>
    </div>
  );
};

export default compose(
  connect(
    ({ app: { user }, clan: { activeClan }, tournament }) => ({
      user,
      activeClan,
      tournament
    }),
    {
      getGames,
      setDialog,
      getClan,
      setFilter,
      getTournaments
    }
  ),
  lifecycle({
    async componentDidMount() {
      const { getGames, getClan, user, setFilter, getTournaments } = this.props;

      if (user && isOrganizer(user.role)) {
        setFilter({ select: "name", ascDesc: true, search: "" });
        getTournaments();
      }

      await getGames();

      if (user && user.clan) await getClan(user.clan);
    }
  })
)(Main);
