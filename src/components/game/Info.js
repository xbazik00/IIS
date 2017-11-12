import React from "react";

const Info = ({ game }) => {
  return (
    <div className="flex-row flex-center">
      <div className="flex-col">
        <div className="flex-row">
          <p className="row-label">Název:</p>
          <p>{game.name}</p>
        </div>
        <div className="flex-row">
          <p className="row-label">Typ:</p>
          <p>{game.type}</p>
        </div>
      </div>
    </div>
  );
};

export default Info;
