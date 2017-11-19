import React from "react";
import { connect } from "react-redux";
import { Button, Glyphicon } from "react-bootstrap";

import { setDialog } from "../../actions/appActions";

import { isAdmin } from "../../utils";

const Header = ({ history, game, user, setDialog }) => (
  <div className="flex-row flex-space-between">
    <h2>{game.name}</h2>
    {user && isAdmin(user.role) ? (
      <Button onClick={() => setDialog("DeleteGame", { name: game.name })}>
        <Glyphicon glyph="remove" />
      </Button>
    ) : (
      <div />
    )}
  </div>
);

export default connect(null, { setDialog })(Header);
