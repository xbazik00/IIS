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

import { getGames } from "../actions/gamesActions";
import { setDialog, setFilter } from "../actions/appActions";
import { getClan } from "../actions/clanActions";

import { isAdmin } from "../utils";

const Main = ({ history, user, setDialog, activeClan, getGames }) => {
  const admin = user && isAdmin(user.role);
  return (
    <div>
      <Header history={history} />
      <div className="container">
        {!admin && (
          <div className="margin-bottom">
            <MainHeader history={history} clan={activeClan} />
          </div>
        )}
        <ContainerHeader title="Hry" />
        <div className="margin-bottom">
          <Filter
            selectOptions={[
              { label: "Název", value: "name" },
              { label: "Žánr", value: "genre" },
              { label: "Vydavatel", value: "publisher" }
            ]}
            handleUpdate={() => getGames()}
          />
        </div>
        <Card className="margin-bottom">
          <CardText>
            <div className="margin-bottom-small">
              <Table history={history} user={user} />
            </div>
            {admin && (
              <div className="flex-row flex-center">
                <Button bsStyle="primary" onClick={() => setDialog("NewGame")}>
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
  connect(({ app: { user }, clan: { activeClan } }) => ({ user, activeClan }), {
    getGames,
    setDialog,
    getClan,
    setFilter
  }),
  lifecycle({
    async componentDidMount() {
      const { getGames, getClan, user, setFilter } = this.props;

      setFilter({ select: "name", ascDesc: true, search: "" });
      await getGames();
      if (user && user.clan) await getClan(user.clan);
    }
  })
)(Main);
