import React from "react";
import { connect } from "react-redux";
import { map } from "lodash";
import { Button, Glyphicon } from "react-bootstrap";
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn
} from "react-md";

import { setDialog } from "../../actions/appActions";

import { isAdmin } from "../../utils";

const Table = ({ history, list, user, setDialog }) => {
  const admin = user && isAdmin(user.role);
  return (
    <div className="flex-row flex-center">
      <DataTable plain className="table">
        <TableHeader className="table-header">
          <TableRow className="table-row">
            <TableColumn className="table-col">Název</TableColumn>
            <TableColumn className="table-col">Žánr</TableColumn>
            <TableColumn className="table-col">Vydavatel</TableColumn>
            {admin && (
              <TableColumn className="table-col">Vydavatel</TableColumn>
            )}
          </TableRow>
        </TableHeader>
        <TableBody className="table-body">
          {map(list, (game, i) => (
            <TableRow
              key={i}
              className="table-row"
              onClick={() => history.push(`/game/${game.name}`)}
            >
              <TableColumn className="table-col">{game.name}</TableColumn>
              <TableColumn className="table-col">{game.genre}</TableColumn>
              <TableColumn className="table-col">{game.publisher}</TableColumn>
              {admin && (
                <TableColumn className="table-col">
                  <Button
                    onClick={e => {
                      e.stopPropagation();
                      setDialog("DeleteGame", { name: game.name });
                    }}
                  >
                    <Glyphicon glyph="remove" />
                  </Button>
                </TableColumn>
              )}
            </TableRow>
          ))}
        </TableBody>
      </DataTable>
    </div>
  );
};

export default connect(({ games: { list } }) => ({ list }), { setDialog })(
  Table
);
