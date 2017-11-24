import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

import { setDialog } from "../../actions/appActions";

const Header = ({ history, setDialog, user, clan }) => {
  if (!user) return <div />;
  return (
    <div className="flex-row flex-space">
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
        <Button onClick={() => history.push("/clan-invitations")}>
          Pozvánky do klanu
        </Button>
      )}
      {clan &&
        clan.boss === user.userName && (
          <Button bsStyle="primary" onClick={() => setDialog("CreateTeam")}>
            Založit tým
          </Button>
        )}
      {(!clan || (clan && clan.boss !== user.userName)) && (
        <Button onClick={() => history.push("/team-invitations")}>
          Pozvánky do týmu
        </Button>
      )}
    </div>
  );
};

export default connect(({ app: { user } }) => ({ user }), { setDialog })(
  Header
);
