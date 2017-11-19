import React from "react";
import { Card, CardText } from "react-md";
import { find } from "lodash";

import { countries } from "../../enums";

const Info = ({ clan, history }) => {
  return (
    <div className="flex-row flex-center">
      <Card className="card-page">
        <CardText>
          <div className="flex-row">
            <p className="row-label">Tag:</p>
            <p>{clan.tag}</p>
          </div>
          <div className="flex-row">
            <p className="row-label">Název:</p>
            <p>{clan.name}</p>
          </div>
          <div className="flex-row">
            <p className="row-label">Vůdce klanu:</p>
            <p>
              <span
                className="link"
                onClick={() => history.push(`/user/${clan.boss}`)}
              >
                {clan.boss}
              </span>
            </p>
          </div>
          <div className="flex-row">
            <p className="row-label">Logo:</p>
            <p>{clan.logo}</p>
          </div>
          <div className="flex-row">
            <p className="row-label">Hymna:</p>
            <p>{clan.anthem}</p>
          </div>
          <div className="flex-row">
            <p className="row-label">Země působení:</p>
            <p>
              {find(countries, c => c.value === clan.country)
                ? find(countries, c => c.value === clan.country).label
                : clan.country}
            </p>
          </div>
        </CardText>
      </Card>
    </div>
  );
};

export default Info;
