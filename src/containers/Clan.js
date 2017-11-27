import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle, withState } from "recompose";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import { Card, CardText } from "react-md";
import { Button, Nav, NavItem } from "react-bootstrap";

import Header from "../components/Header";
import ClanHeader from "../components/clan/Header";
import Info from "../components/clan/Info";
import Table from "../components/clan/Table";
import SponsorTable from "../components/sponsor/Table";

import { getClan } from "../actions/clanActions";
import { setDialog, setFilter } from "../actions/appActions";
import { getSponsorsByClanTag, getSponsors } from "../actions/sponsorActions";
import { getUsers } from "../actions/usersActions";

const Clan = ({
  history,
  activeClan,
  user,
  setDialog,
  tableState,
  setTableState,
  clanSponsors,
  getSponsors,
  getUsers,
  setFilter
}) => {
  return (
    <div>
      <Header history={history} />
      {activeClan && (
        <div className="container">
          <ClanHeader clan={activeClan} user={user} />
          <div className="margin-bottom">
            <Info
              history={history}
              clan={activeClan}
              initialValues={activeClan}
              user={user}
            />
          </div>
          <Card className="margin-bottom">
            <Nav
              bsStyle="pills"
              activeKey={tableState}
              onSelect={value => setTableState(value)}
            >
              <NavItem eventKey={1}>Uživatelé</NavItem>
              <NavItem eventKey={2}>Sponzoři</NavItem>
            </Nav>
            {tableState === 1 ? (
              <CardText>
                <h3>Uživatelé</h3>
                <div
                  className={classNames({
                    "margin-bottom-small": user.userName === activeClan.boss
                  })}
                >
                  <Table history={history} clan={activeClan} user={user} />
                </div>
                {user.userName === activeClan.boss && (
                  <div className="flex-row flex-center">
                    <Button
                      bsStyle="primary"
                      onClick={() => {
                        setFilter({
                          select: "userName",
                          ascDesc: true,
                          search: ""
                        });
                        getUsers();
                        setDialog("InviteUserToClan", {
                          clanTag: activeClan.tag
                        });
                      }}
                    >
                      Pozvat uživatele
                    </Button>
                  </div>
                )}
              </CardText>
            ) : (
              <CardText>
                <h3>Sponzoři</h3>
                <div
                  className={classNames({
                    "margin-bottom-small": user.userName === activeClan.boss
                  })}
                >
                  <SponsorTable
                    history={history}
                    clan={activeClan}
                    user={user}
                    sponsors={clanSponsors.list}
                    clanSponsors
                  />
                </div>
                {user.userName === activeClan.boss && (
                  <div className="flex-row flex-center">
                    <Button
                      bsStyle="primary"
                      onClick={() => {
                        setFilter({
                          select: "acronym",
                          ascDesc: true,
                          search: ""
                        });
                        getSponsors();
                        setDialog("AddSponsorToClan", {
                          clanTag: activeClan.tag
                        });
                      }}
                    >
                      Přidat sponzora
                    </Button>
                  </div>
                )}
              </CardText>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default compose(
  withRouter,
  connect(
    ({ clan: { activeClan }, app: { user }, sponsor: { clanSponsors } }) => ({
      clanSponsors,
      activeClan,
      user
    }),
    {
      getClan,
      setDialog,
      getSponsorsByClanTag,
      getSponsors,
      getUsers,
      setFilter
    }
  ),
  withState("tableState", "setTableState", 1),
  lifecycle({
    async componentWillMount() {
      const { match, getClan, getSponsorsByClanTag } = this.props;
      await getClan(match.params.tag);
      await getSponsorsByClanTag(match.params.tag);
    }
  })
)(Clan);
