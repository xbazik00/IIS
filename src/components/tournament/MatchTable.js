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
import { Button, Glyphicon } from "react-bootstrap";

import { setDialog } from "../../actions/appActions";

import { isOrganizer } from "../../utils";

const Table = ({ history, matches, user, tournament, setDialog }) => {
  const organizer = user && isOrganizer(user.role);
  return (
    <div className="flex-row flex-center">
      <DataTable plain className="table">
        <TableHeader className="table-header">
          <TableRow className="table-row">
            <TableColumn className="table-col">Datum konání</TableColumn>
            <TableColumn className="table-col">Tým 1</TableColumn>
            <TableColumn className="table-col">Tým 2</TableColumn>
            <TableColumn className="table-col">Výsledek</TableColumn>
            {organizer &&
              tournament.id_organizer === user.userName && (
                <TableColumn className="table-col">Akce</TableColumn>
              )}
          </TableRow>
        </TableHeader>
        <TableBody className="table-body">
          {map(matches, (m, i) => (
            <TableRow key={i} className="table-row">
              <TableColumn className="table-col">{m.date}</TableColumn>
              <TableColumn className="table-col">{m.name1}</TableColumn>
              <TableColumn className="table-col">{m.name2}</TableColumn>
              <TableColumn className="table-col">{m.result}</TableColumn>
              {organizer &&
                tournament.id_organizer === user.userName && (
                  <TableColumn className="table-col">
                    <Button
                      onClick={e => {
                        e.stopPropagation();
                        setDialog("DeleteMatch", {
                          id: m.id,
                          tournamentId: tournament.id
                        });
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

export default connect(null, { setDialog })(Table);
