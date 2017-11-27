import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import { Card, CardText } from "react-md";

import Header from "../components/Header";
import ContainerHeader from "../components/ContainerHeader";
import Filter from "../components/Filter";
import Table from "../components/clans/Table";

import { setFilter } from "../actions/appActions";
import { getClans } from "../actions/clanActions";

const Clans = ({ history, clan, user, getClans }) => {
  return (
    <div>
      <Header history={history} />
      <div className="container">
        <ContainerHeader title="Klany" />
        <div className="margin-bottom">
          <Filter
            selectOptions={[
              { label: "Tag", value: "tag" },
              { label: "Název", value: "name" },
              { label: "Logo", value: "logo" },
              { label: "Hymna", value: "anthem" }
            ]}
            handleUpdate={() => getClans()}
          />
        </div>
        <Card className="margin-bottom">
          <CardText>
            <Table history={history} clans={clan.list} user={user} />
          </CardText>
        </Card>
      </div>
    </div>
  );
};

export default compose(
  connect(
    ({ app: { user }, clan }) => ({
      user,
      clan
    }),
    { setFilter, getClans }
  ),
  lifecycle({
    async componentDidMount() {
      const { setFilter, getClans } = this.props;

      setFilter({ select: "tag", ascDesc: true, search: "" });
      await getClans();
    }
  })
)(Clans);
