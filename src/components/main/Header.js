import React from "react";
import { connect } from "react-redux";
import { Button, ButtonToolbar, ButtonGroup } from "react-bootstrap";

import { setDialog } from "../../actions/appActions";

const Header = ({ history, setDialog, user, clan }) => {
  if (!user) return <div />;
  return (
    <div className="flex-row flex-center">
      <ButtonToolbar>
        <ButtonGroup bsSize="large">
          {user.clan ? (
            <Button
              bsStyle="primary"
              onClick={() => history.push(`/clan/${user.clan}`)}
            >
              Můj klan
            </Button>
          ) : (
            <Button bsStyle="primary" onClick={() => setDialog("CreateClan")}>
              Založit klan
            </Button>
          )}
          {!user.clan && (
            <Button
              bsStyle="primary"
              onClick={() => history.push("/clan-invitations")}
            >
              Pozvánky do klanu
            </Button>
          )}
        </ButtonGroup>
        <ButtonGroup bsSize="large">
          {clan &&
            clan.boss === user.userName && (
              <Button bsStyle="primary" onClick={() => setDialog("CreateTeam")}>
                Založit tým
              </Button>
            )}
          <Button bsStyle="primary" onClick={() => history.push("/teams")}>
            Moje týmy
          </Button>
          {(!clan || (clan && clan.boss !== user.userName)) && (
            <Button
              bsStyle="primary"
              onClick={() => history.push("/team-invitations")}
            >
              Pozvánky do týmu
            </Button>
          )}
        </ButtonGroup>
      </ButtonToolbar>
    </div>
  );
};

export default connect(({ app: { user } }) => ({ user }), { setDialog })(
  Header
);
