import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import classNames from "classnames";
import { DropdownButton, MenuItem, Glyphicon } from "react-bootstrap";

import { signOut } from "../actions/appActions";

import { isAdmin } from "../utils";

const Header = ({ history, authStyle, signOut, user }) => {
  const admin = user && isAdmin(user.role);
  return (
    <header className="header">
      <div className={classNames("inner", { normal: !authStyle, authStyle })}>
        <h1
          className="title"
          onClick={() => !authStyle && history.push("/main")}
        >
          Evidence hráčů e-sportu
        </h1>
        {!authStyle && (
          <DropdownButton
            title={<Glyphicon glyph="menu-hamburger" />}
            bsStyle="primary"
            noCaret
            id="drop-down-menu"
            pullRight
          >
            <MenuItem eventKey="1" onClick={() => history.push("/main")}>
              Domů
            </MenuItem>
            <MenuItem eventKey="2" onClick={() => history.push("/profile")}>
              Profil
            </MenuItem>
            <MenuItem eventKey="3" onClick={() => history.push("/users")}>
              Uživatelé
            </MenuItem>
            {admin && (
              <MenuItem
                eventKey="4"
                onClick={() => history.push("/tournaments")}
              >
                Turnaje
              </MenuItem>
            )}
            {admin && (
              <MenuItem eventKey="5" onClick={() => history.push("/sponsors")}>
                Sponzoři
              </MenuItem>
            )}
            <MenuItem
              eventKey="6"
              onClick={() => {
                signOut();
                history.push("/");
              }}
            >
              Odhlásit
            </MenuItem>
          </DropdownButton>
        )}
      </div>
    </header>
  );
};

export default compose(connect(({ app: { user } }) => ({ user }), { signOut }))(
  Header
);
