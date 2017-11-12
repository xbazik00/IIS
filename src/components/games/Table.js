import React from "react";
import { connect } from "react-redux";
import { map } from "lodash";
import { Card, CardTitle, CardText } from "react-md";

const Info = ({ history, list }) => {
  return (
    <div className="flex-row flex-center">
      {map(list, (game, i) => (
        <Card
          raise
          key={i}
          className="card"
          onClick={() => history.push(`/games/${game.id}`)}
        >
          <CardTitle title={game.name} />
          <CardText>{game.type}</CardText>
        </Card>
      ))}
    </div>
  );
};

export default connect(({ games: { list } }) => ({ list }), null)(Info);
