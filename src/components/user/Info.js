import React from "react";
import { find } from "lodash";
import { Card, CardText } from "react-md";

import { countries } from "../../enums";

import { isPlayer, isOrganizer } from "../../utils";

const Info = ({ setActiveForm, user, history }) => {
  const player = isPlayer(user.role);
  const organizer = isOrganizer(user.role);
  return (
    <div className="flex-row flex-center">
      <Card className="card-page">
        <CardText>
          <div className="flex-col">
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
            {user.clan && (
              <div className="flex-row">
                <p className="row-label">Klan:</p>
                <p>
                  <span
                    className="link"
                    onClick={() => history.push(`/clan/${user.clan}`)}
                  >
                    {user.clan}
                  </span>
                </p>
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
        </CardText>
      </Card>
    </div>
  );
};

export default Info;
