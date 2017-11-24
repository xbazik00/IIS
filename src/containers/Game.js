import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import { withRouter } from "react-router-dom";

import Header from "../components/Header";
import GameHeader from "../components/game/Header";
import Info from "../components/game/Info";

import { getGame, setActiveGame } from "../actions/gamesActions";

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
      getGame,
      setActiveGame
    }
  ),
  lifecycle({
    componentWillMount() {
      const { getGame, match } = this.props;

      getGame(match.params.id);
    },
    componentWillUnmount() {
      const { setActiveGame } = this.props;

      setActiveGame(null);
    }
  })
)(Game);
