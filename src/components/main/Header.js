import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

import { setDialog } from "../../actions/appActions";

const Header = ({ setDialog }) => {
  return (
    <div className="flex-row">
      <Button bsStyle="primary" onClick={() => setDialog("CreateClan")}>
        Založit klan
      </Button>
    </div>
  );
};

export default connect(null, { setDialog })(Header);
