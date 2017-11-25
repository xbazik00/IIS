import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import { withRouter } from "react-router-dom";

import Header from "../components/Header";
import ContainerHeader from "../components/ContainerHeader";
import Info from "../components/team/Info";

import { getTeam } from "../actions/teamActions";

const Team = ({ history, activeTeam }) => {
  return (
    <div>
      <Header history={history} />
      {activeTeam && (
        <div className="container">
          <ContainerHeader title={activeTeam.name} />
          <Info history={history} team={activeTeam} />
        </div>
      )}
    </div>
  );
};

export default compose(
  withRouter,
  connect(({ team: { activeTeam } }) => ({ activeTeam }), {
    getTeam
  }),
  lifecycle({
    async componentDidMount() {
      const { getTeam, match } = this.props;
      await getTeam(match.params.name);
    }
  })
)(Team);
