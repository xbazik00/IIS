import React from "react";

const Info = ({ setActiveForm, team, history }) => {
  return (
    <div className="info">
      <div className="flex-col">
        <div className="flex-row">
          <p className="row-label">Název:</p>
          <p>{team.name}</p>
        </div>
        <div className="flex-row">
          <p className="row-label">Maximální počet členů:</p>
          <p>{team.number_of_players}</p>
        </div>
        <div className="flex-row">
          <p className="row-label">Hra:</p>
          <p>
            <span
              className="link"
              onClick={() => history.push(`/game/${team.game}`)}
            >
              {team.game}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Info;
