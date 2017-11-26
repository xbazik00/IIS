import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import { Card, CardText } from "react-md";
import { Button } from "react-bootstrap";

import Header from "../components/Header";
import ContainerHeader from "../components/ContainerHeader";
import Table from "../components/sponsor/Table";

import { getSponsors } from "../actions/sponsorActions";
import { setDialog } from "../actions/appActions";

const Sponsors = ({ history, sponsor, user, setDialog }) => {
  return (
    <div>
      <Header history={history} />
      <div className="container">
        <ContainerHeader title="Sponzoři" />
        <Card className="margin-bottom">
          <CardText>
            <Table history={history} sponsors={sponsor.list} user={user} />
            <div className="flex-row flex-center">
              <Button
                bsStyle="primary"
                onClick={() => setDialog("CreateSponsor")}
              >
                Přidat sponzora
              </Button>
            </div>
          </CardText>
        </Card>
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
    { getSponsors, setDialog }
  ),
  lifecycle({
    async componentDidMount() {
      const { getSponsors } = this.props;
      await getSponsors();
    }
  })
)(Sponsors);
