import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import classNames from "classnames";
import { DropdownButton, MenuItem, Glyphicon } from "react-bootstrap";

import { signOut } from "../actions/appActions";

const Header = ({ history, authStyle, signOut }) => {
  return (
    <header className={classNames("header", { normal: !authStyle, authStyle })}>
      <h1 onClick={() => history.push("/main")}>Evidence hráčů e-sportu</h1>
      {!authStyle && (
        <DropdownButton
          title={<Glyphicon glyph="user" />}
          bsStyle="primary"
          noCaret
          id="drop-down-menu"
          pullRight
        >
          <MenuItem eventKey="1" onClick={() => history.push("/profile")}>
            Profil
          </MenuItem>
          <MenuItem
            eventKey="2"
            onClick={() => {
              signOut();
              history.push("/");
            }}
          >
            Odhlásit
          </MenuItem>
        </DropdownButton>
      )}
    </header>
  );
};

export default compose(connect(null, { signOut }))(Header);
