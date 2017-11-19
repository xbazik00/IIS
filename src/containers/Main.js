import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import { Card, CardText } from "react-md";

import Header from "../components/Header";
import MainHeader from "../components/main/Header";
import Table from "../components/games/Table";

import { getGames } from "../actions/gamesActions";

const Main = ({ history }) => {
  return (
    <div>
      <Header history={history} />
      <div className="container">
        <div className="margin-bottom">
          <MainHeader history={history} />
        </div>
        <Card className="margin-bottom">
          <CardText>
            <h3>Hry</h3>
            <Table history={history} />
          </CardText>
        </Card>
      </div>
    </div>
  );
};

export default compose(
  connect(null, { getGames }),
  lifecycle({
    async componentDidMount() {
      const { getGames } = this.props;
      await getGames();
    }
  })
)(Main);
