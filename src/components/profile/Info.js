import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

import { setActiveForm } from "../../actions/appActions";

const Info = ({ setActiveForm }) => {
  return (
    <div className="info">
      <div className="flex-col">
        <div className="flex-col margin-bottom-small">
          <div className="flex-row">
            <p className="row-label">Uživatelské jméno:</p>
            <p>Usename</p>
          </div>
          <div className="flex-row">
            <p className="row-label">Jméno:</p>
            <p>Jméno</p>
          </div>
          <div className="flex-row">
            <p className="row-label">Příjmení:</p>
            <p>Příjmení</p>
          </div>
        </div>
        <div className="flex-row flex-center">
          <Button
            bsStyle="primary"
            onClick={() => setActiveForm("profileEditForm")}
          >
            Upravit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { setActiveForm })(Info);
