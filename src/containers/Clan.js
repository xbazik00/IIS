import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import { Card, CardText } from "react-md";
import { Button } from "react-bootstrap";

import Header from "../components/Header";
import ClanHeader from "../components/clan/Header";
import Info from "../components/clan/Info";
import Table from "../components/clan/Table";

import { getClan } from "../actions/clanActions";
import { setDialog } from "../actions/appActions";

const Clan = ({ history, activeClan, user, setDialog }) => {
  return (
    <div>
      <Header history={history} />
      {activeClan && (
        <div className="container">
          <ClanHeader title={activeClan.name} tag={activeClan.tag} />
          <div className="margin-bottom">
            <Info history={history} clan={activeClan} />
          </div>
          <Card className="margin-bottom">
            <CardText>
              <h3>Uživatelé</h3>
              <div
                className={classNames({
                  "margin-bottom-small": user.userName === activeClan.boss
                })}
              >
                <Table history={history} clan={activeClan} />
              </div>
              {user.userName === activeClan.boss && (
                <Button
                  bsStyle="primary"
                  onClick={() =>
                    setDialog("InviteUserToClan", { clanTag: activeClan.tag })
                  }
                >
                  Pozvat hráče
                </Button>
              )}
            </CardText>
          </Card>
        </div>
      )}
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
    { getClan, setDialog }
  ),
  lifecycle({
    async componentWillMount() {
      const { match, getClan } = this.props;
      await getClan(match.params.tag);
    }
  })
)(Clan);
