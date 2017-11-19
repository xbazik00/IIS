import React from "react";
import { connect } from "react-redux";
import { Button, Glyphicon } from "react-bootstrap";

import { setDialog } from "../../actions/appActions";

const Header = ({ history, clan, user, setDialog }) => (
  <div className="flex-row flex-space-between">
    <h2>{clan.name}</h2>
    {clan.boss === user.userName ? (
      <Button onClick={() => setDialog("DeleteClan", { tag: clan.tag })}>
        <Glyphicon glyph="remove" />
      </Button>
    ) : (
      <div />
    )}
  </div>
);

export default connect(null, { setDialog })(Header);
