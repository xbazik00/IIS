import React from "react";
import { connect } from "react-redux";
import { Button, Glyphicon } from "react-bootstrap";
import { find } from "lodash";

import { setDialog } from "../../actions/appActions";

const Header = ({ history, clan, user, setDialog }) => (
  <div className="flex-row flex-space-between">
    <h2>{clan.name}</h2>
    {clan && find(clan.users, u => u.userName === user.userName) ? (
      <Button
        onClick={() => {
          if (clan.boss === user.userName)
            setDialog("DeleteClan", { tag: clan.tag });
          else
            setDialog("DeleteUserFromClan", {
              tag: clan.tag,
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
