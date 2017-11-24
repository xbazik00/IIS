import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import { Card, CardText } from "react-md";
import { Button } from "react-bootstrap";

import Header from "../components/Header";
import MainHeader from "../components/main/Header";
import Table from "../components/games/Table";

import { getGames } from "../actions/gamesActions";
import { setDialog } from "../actions/appActions";
import { getClan } from "../actions/clanActions";

import { isAdmin } from "../utils";

const Main = ({ history, user, setDialog, activeClan }) => {
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
        <Card className="margin-bottom">
          <CardText>
            <h3>Hry</h3>
            <div className="margin-bottom-small">
              <Table history={history} user={user} />
            </div>
            {admin && (
              <Button bsStyle="primary" onClick={() => setDialog("NewGame")}>
                Přidat hru
              </Button>
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
    getClan
  }),
  lifecycle({
    async componentDidMount() {
      const { getGames, getClan, user } = this.props;
      await getGames();
      if (user && user.clan) await getClan(user.clan);
    }
  })
)(Main);
