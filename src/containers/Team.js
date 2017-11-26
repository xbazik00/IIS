import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import { Card, CardText } from "react-md";
import { Button } from "react-bootstrap";

import Header from "../components/Header";
import TeamHeader from "../components/team/Header";
import Info from "../components/team/Info";
import Table from "../components/team/Table";

import { getTeam } from "../actions/teamActions";
import { setDialog } from "../actions/appActions";

const Team = ({ history, activeTeam, user, activeClan, setDialog }) => {
  return (
    <div>
      <Header history={history} />
      {activeTeam && (
        <div className="container">
          <TeamHeader team={activeTeam} user={user} clan={activeClan} />
          <div className="flex-row flex-center margin-bottom">
            <Card>
              <CardText>
                <Info history={history} team={activeTeam} />
              </CardText>
            </Card>
          </div>
          <div className="flex-row flex-center margin-bottom">
            <Card>
              <CardText>
                <h3>Uživatelé</h3>
                <div
                  className={classNames({
                    "margin-bottom-small": user.userName === activeClan.boss
                  })}
                >
                  <Table
                    history={history}
                    team={activeTeam}
                    user={user}
                    clan={activeClan}
                  />
                </div>
                {user.userName === activeClan.boss && (
                  <div className="flex-row flex-center">
                    <Button
                      bsStyle="primary"
                      onClick={() =>
                        setDialog("InviteUserToTeam", { name: activeTeam.name })
                      }
                    >
                      Pozvat uživatele
                    </Button>
                  </div>
                )}
              </CardText>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default compose(
  withRouter,
  connect(
    ({ app: { user }, team: { activeTeam }, clan: { activeClan } }) => ({
      user,
      activeTeam,
      activeClan
    }),
    {
      getTeam,
      setDialog
    }
  ),
  lifecycle({
    async componentDidMount() {
      const { getTeam, match } = this.props;
      await getTeam(match.params.name);
    }
  })
)(Team);
