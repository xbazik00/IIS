import React from "react";
import { connect } from "react-redux";
import { Button, Glyphicon } from "react-bootstrap";

import { setDialog } from "../../actions/appActions";

const Header = ({ history, title, tag, setDialog }) => (
  <div className="flex-row flex-space-between">
    <h2>{title}</h2>
    <Button onClick={() => setDialog("DeleteClan", { tag })}>
      <Glyphicon glyph="remove" />
    </Button>
  </div>
);

export default connect(null, { setDialog })(Header);
