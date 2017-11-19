import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

import { setDialog } from "../../actions/appActions";

const Header = ({ history, setDialog, user }) => {
  return (
    <div className="flex-row flex-space">
      {user && user.clan ? (
        <Button
          bsStyle="primary"
          onClick={() => history.push(`/clan/${user.clan}`)}
        >
          Můj klan
        </Button>
      ) : (
        <Button onClick={() => setDialog("CreateClan")}>Založit klan</Button>
      )}
      <Button onClick={() => setDialog("CreateTeam")}>Založit tým</Button>
    </div>
  );
};

export default connect(({ app: { user } }) => ({ user }), { setDialog })(
  Header
);
