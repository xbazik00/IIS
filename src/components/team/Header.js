import React from "react";
import { connect } from "react-redux";
import { Button, Glyphicon } from "react-bootstrap";

import { setDialog } from "../../actions/appActions";

const Header = ({ history, user, setDialog, team, clan }) => (
  <div className="flex-row flex-space-between">
    <h2>{team.name}</h2>
    {user && clan && user.userName === clan.boss ? (
      <Button onClick={() => setDialog("DeleteTeam", { name: team.name })}>
        <Glyphicon glyph="remove" />
      </Button>
    ) : (
      <div />
    )}
  </div>
);

export default connect(null, { setDialog })(Header);
