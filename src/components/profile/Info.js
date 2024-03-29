import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { find } from "lodash";

import { setActiveForm } from "../../actions/appActions";
import { isCoach, isPlayer, isOrganizer, isAdmin } from "../../utils";

import { countries } from "../../enums";

const Info = ({ setActiveForm, user }) => {
  const coach = isCoach(user.role);
  const player = isPlayer(user.role);
  const organizer = isOrganizer(user.role);
  const admin = isAdmin(user.role);
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
            <p>
              {find(countries, c => c.value === user.country)
                ? find(countries, c => c.value === user.country).label
                : user.country}
            </p>
          </div>
          {coach && (
            <div className="flex-row">
              <p className="row-label">Poznámky:</p>
              <p>{user.notes}</p>
            </div>
          )}
          {player && (
            <div className="flex-row">
              <p className="row-label">Myš:</p>
              <p>{user.mouse}</p>
            </div>
          )}
          {player && (
            <div className="flex-row">
              <p className="row-label">Klávesnice:</p>
              <p>{user.keyboard}</p>
            </div>
          )}
          {organizer && (
            <div className="flex-row">
              <p className="row-label">Název organizátora:</p>
              <p>{user.org_name}</p>
            </div>
          )}
          {organizer && (
            <div className="flex-row">
              <p className="row-label">Telefonní číslo:</p>
              <p>{user.phone}</p>
            </div>
          )}
        </div>
        {!admin && (
          <div className="flex-row flex-center">
            <Button
              bsStyle="primary"
              onClick={() => setActiveForm("profileEditForm")}
              block
            >
              Upravit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default connect(null, { setActiveForm })(Info);
