import React from "react";
import { connect } from "react-redux";
import { Button, Glyphicon } from "react-bootstrap";
import { find } from "lodash";

import { setDialog } from "../../actions/appActions";

const Header = ({ history, user, setDialog, team, clan }) => (
  <div className="flex-row flex-space-between">
    <h2>{team.name}</h2>
    {team && find(team.users, u => u.userName === user.userName) ? (
      <Button
        onClick={() => {
          if (clan.boss === user.userName)
            setDialog("DeleteTeam", { name: team.name });
          else
            setDialog("DeleteUserFromTeam", {
              name: team.name,
              userName: user.userName,
              deleteMe: true
            });
        }}
      >
        <Glyphicon glyph="remove" />
      </Button>
    ) : (
      <div />
    )}
  </div>
);

export default connect(null, { setDialog })(Header);
