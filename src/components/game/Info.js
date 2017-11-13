import React from "react";
import { Card, CardText } from "react-md";

import { formatTime } from "../../utils";

const Info = ({ game }) => {
  return (
    <div className="flex-row flex-center">
      <Card className="card-page">
        <CardText>
          <div className="flex-row">
            <p className="row-label">Název:</p>
            <p>{game.name}</p>
          </div>
          <div className="flex-row">
            <p className="row-label">Žánr:</p>
            <p>{game.genre}</p>
          </div>
          <div className="flex-row">
            <p className="row-label">Datum vydání:</p>
            <p>{formatTime(game.created)}</p>
          </div>
          <div className="flex-row">
            <p className="row-label">Vydavatel:</p>
            <p>{game.publisher}</p>
          </div>
          <div className="flex-row">
            <p className="row-label">Módy:</p>
            <p>{game.modes}</p>
          </div>
        </CardText>
      </Card>
    </div>
  );
};

export default Info;
