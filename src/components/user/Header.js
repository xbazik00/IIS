import React from "react";
import { connect } from "react-redux";
import { Button, Glyphicon } from "react-bootstrap";

import { setDialog } from "../../actions/appActions";

import { isAdmin } from "../../utils";

const Header = ({ history, user, currentUser, setDialog }) => (
  <div className="flex-row flex-space-between">
    <h2>{user.userName}</h2>
    {currentUser && isAdmin(currentUser.role) ? (
      <Button
        onClick={() => setDialog("DeleteUser", { userName: user.userName })}
      >
        <Glyphicon glyph="remove" />
      </Button>
    ) : (
      <div />
    )}
  </div>
);

export default connect(null, { setDialog })(Header);
