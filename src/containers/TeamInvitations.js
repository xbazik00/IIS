import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import { Card, CardText } from "react-md";

import Header from "../components/Header";
import ContainerHeader from "../components/ContainerHeader";
import Table from "../components/teamInvitations/Table";

import { getInvitations } from "../actions/teamActions";

const TeamInvitations = ({ history, invitations }) => {
  return (
    <div>
      <Header history={history} />
      <div className="container">
        <ContainerHeader title="Pozvánky do týmu" />
        <Card className="margin-bottom">
          <CardText>
            <Table history={history} invitations={invitations} />
          </CardText>
        </Card>
      </div>
    </div>
  );
};

export default compose(
  connect(
    ({ team: { invitations }, app: { user } }) => ({
      invitations,
      user
    }),
    { getInvitations }
  ),
  lifecycle({
    async componentDidMount() {
      const { getInvitations, user } = this.props;
      await getInvitations(user.userName);
    }
  })
)(TeamInvitations);
