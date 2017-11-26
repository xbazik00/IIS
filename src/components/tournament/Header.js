import React from "react";
import { connect } from "react-redux";
import { Button, Glyphicon } from "react-bootstrap";

import { setDialog } from "../../actions/appActions";

import { isOrganizer, isAdmin } from "../../utils";

const Header = ({ history, tournament, user, setDialog }) => (
  <div className="flex-row flex-space-between">
    <h2>{tournament.name}</h2>
    {user &&
    ((isOrganizer(user.role) && user.userName === tournament.id_organizer) ||
      isAdmin(user.role)) ? (
      <Button
        onClick={() =>
          setDialog("DeleteTournament", {
            id: tournament.id,
            name: tournament.name
          })
        }
      >
        <Glyphicon glyph="remove" />
      </Button>
    ) : (
      <div />
    )}
  </div>
);

export default connect(null, { setDialog })(Header);
