import React from "react";
import { connect } from "react-redux";
import { map } from "lodash";
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn
} from "react-md";

const Info = ({ history, list }) => {
  return (
    <div className="flex-row flex-center">
      <DataTable plain className="table">
        <TableHeader className="table-header">
          <TableRow className="table-row">
            <TableColumn className="table-col">Název</TableColumn>
            <TableColumn className="table-col">Typ</TableColumn>
            <TableColumn className="table-col">Vydavatel</TableColumn>
          </TableRow>
        </TableHeader>
        <TableBody className="table-body">
          {map(list, (game, i) => (
            <TableRow
              key={i}
              className="table-row"
              onClick={() => history.push(`/games/${game.id}`)}
            >
              <TableColumn className="table-col">{game.name}</TableColumn>
              <TableColumn className="table-col">{game.genre}</TableColumn>
              <TableColumn className="table-col">{game.publisher}</TableColumn>
            </TableRow>
          ))}
        </TableBody>
      </DataTable>
    </div>
  );
};

export default connect(({ games: { list } }) => ({ list }), null)(Info);
