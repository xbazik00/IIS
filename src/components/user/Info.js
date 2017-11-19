import React from "react";
import { find } from "lodash";
import { Card, CardText } from "react-md";

import { countries } from "../../enums";

const Info = ({ setActiveForm, user, history }) => {
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
          </div>
        </CardText>
      </Card>
    </div>
  );
};

export default Info;
