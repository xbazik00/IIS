import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import { Card, CardText } from "react-md";

import Header from "../components/Header";
import ContainerHeader from "../components/ContainerHeader";
import Table from "../components/sponsor/Table";

import { getSponsors } from "../actions/sponsorActions";

const Sponsors = ({ history, sponsor, user }) => {
  return (
    <div>
      <Header history={history} />
      <div className="container">
        <ContainerHeader title="Sponzoři" />
        {sponsor && (
          <Card className="margin-bottom">
            <CardText>
              <Table history={history} sponsors={sponsor.list} user={user} />
            </CardText>
          </Card>
        )}
      </div>
    </div>
  );
};

export default compose(
  connect(
    ({ app: { user }, sponsor }) => ({
      user,
      sponsor
    }),
    { getSponsors }
  ),
  lifecycle({
    async componentDidMount() {
      const { getSponsors } = this.props;
      await getSponsors();
    }
  })
)(Sponsors);
