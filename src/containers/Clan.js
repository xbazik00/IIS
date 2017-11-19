import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import { withRouter } from "react-router-dom";
import { Card, CardText } from "react-md";

import Header from "../components/Header";
import ContainerHeader from "../components/ContainerHeader";
import Info from "../components/clan/Info";
import Table from "../components/clan/Table";

import { getClan } from "../actions/clanActions";

const Clan = ({ history, activeClan, user }) => {
  if (!activeClan) return <div />;

  return (
    <div>
      <Header history={history} />
      <div className="container">
        <ContainerHeader title={activeClan.name} />
        <div className="margin-bottom">
          <Info clan={activeClan} />
        </div>
        <Card>
          <CardText>
            <h3>Uživatelé</h3>
            <Table clan={activeClan} />
          </CardText>
        </Card>
      </div>
    </div>
  );
};

export default compose(
  withRouter,
  connect(
    ({ clan: { activeClan }, app: { user } }) => ({
      activeClan,
      user
    }),
    { getClan }
  ),
  lifecycle({
    async componentWillMount() {
      const { match, getClan } = this.props;
      await getClan(match.params.tag);
    }
  })
)(Clan);
