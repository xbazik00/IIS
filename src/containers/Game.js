import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import { withRouter } from "react-router-dom";

import Header from "../components/Header";
import GameHeader from "../components/game/Header";
import Info from "../components/game/Info";

import { setActiveForm } from "../actions/appActions";
import { getGames, getGame, setActiveGame } from "../actions/gamesActions";

const Game = ({ history, activeGame, user }) => {
  return (
    <div>
      <Header history={history} />
      {activeGame && (
        <div className="container">
          <GameHeader game={activeGame} user={user} />
          <Info game={activeGame} initialValues={activeGame} />
        </div>
      )}
    </div>
  );
};

export default compose(
  withRouter,
  connect(
    ({ app: { user }, games: { activeGame } }) => ({ user, activeGame }),
    {
      getGames,
      getGame,
      setActiveGame,
      setActiveForm
    }
  ),
  lifecycle({
    async componentWillMount() {
      const { getGames, getGame, match } = this.props;

      await getGames();
      getGame(match.params.id);
    },
    componentWillUnmount() {
      const { setActiveGame, setActiveForm } = this.props;

      setActiveGame(null);
      setActiveForm(null);
    }
  })
)(Game);
