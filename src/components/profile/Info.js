import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { find } from "lodash";

import { setActiveForm } from "../../actions/appActions";
import { isCoach } from "../../utils";

import { countries } from "../../enums";

const Info = ({ setActiveForm, user }) => {
  const coach = isCoach(user.role);
  return (
    <div className="info">
      <div className="flex-col">
        <div className="flex-col margin-bottom-small">
          <div className="flex-row">
            <p className="row-label">Uživatelské jméno:</p>
            <p>{user.userName}</p>
          </div>
          <div className="flex-row">
            <p className="row-label">Jméno:</p>
            <p>{user.firstName}</p>
          </div>
          <div className="flex-row">
            <p className="row-label">Příjmení:</p>
            <p>{user.surname}</p>
          </div>
          <div className="flex-row">
            <p className="row-label">Země původu:</p>
            <p>{find(countries, c => c.value === user.country).label}</p>
          </div>
          {coach && (
            <div className="flex-row">
              <p className="row-label">Poznámky:</p>
              <p>{user.notes}</p>
            </div>
          )}
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
