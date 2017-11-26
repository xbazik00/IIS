import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import { Card, CardText } from "react-md";

import Header from "../components/Header";
import ContainerHeader from "../components/ContainerHeader";
import Filter from "../components/Filter";
import Table from "../components/tournaments/Table";

import { setFilter } from "../actions/appActions";
import { getTournaments } from "../actions/tournamentActions";

const Tournaments = ({ history, tournament, user, getTournaments }) => {
  return (
    <div>
      <Header history={history} />
      <div className="container">
        <ContainerHeader title="Turnaje" />
        <Filter
          selectOptions={[
            { label: "Název", value: "name" },
            { label: "Datum konání", value: "date" },
            { label: "Hlavní cena", value: "prize" },
            { label: "Hra", value: "game" },
            { label: "Vítěz", value: "winner" }
          ]}
          handleUpdate={() => getTournaments()}
        />
        <Card className="margin-bottom">
          <CardText>
            <Table
              history={history}
              tournaments={tournament.list}
              user={user}
            />
          </CardText>
        </Card>
      </div>
    </div>
  );
};

export default compose(
  connect(
    ({ app: { user }, tournament }) => ({
      user,
      tournament
    }),
    { setFilter, getTournaments }
  ),
  lifecycle({
    async componentDidMount() {
      const { setFilter, getTournaments } = this.props;

      setFilter({ select: "name", ascDesc: true, search: "" });
      await getTournaments();
    }
  })
)(Tournaments);
