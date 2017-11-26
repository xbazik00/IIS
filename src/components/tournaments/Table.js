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

import { isOrganizer, isAdmin } from "../../utils";

const Table = ({ history, tournaments, user, setDialog }) => {
  const admin = user && isAdmin(user.role);
  const organizer = user && isOrganizer(user.role);
  return (
    <div className="flex-row flex-center">
      <DataTable plain className="table">
        <TableHeader className="table-header">
          <TableRow className="table-row">
            <TableColumn className="table-col">Název</TableColumn>
            <TableColumn className="table-col">Datum konání</TableColumn>
            <TableColumn className="table-col">Hlavní cena</TableColumn>
            <TableColumn className="table-col">Hra</TableColumn>
            <TableColumn className="table-col">Vítěz</TableColumn>
            {user &&
              (organizer || admin) && (
                <TableColumn className="table-col">Akce</TableColumn>
              )}
          </TableRow>
        </TableHeader>
        <TableBody className="table-body">
          {map(tournaments, (t, i) => (
            <TableRow
              key={i}
              className="table-row"
              onClick={() => history.push(`/tournament/${t.id}`)}
            >
              <TableColumn className="table-col">{t.name}</TableColumn>
              <TableColumn className="table-col">{t.date}</TableColumn>
              <TableColumn className="table-col">{t.prize}</TableColumn>
              <TableColumn className="table-col">{t.game}</TableColumn>
              <TableColumn className="table-col">{t.winner}</TableColumn>
              {user &&
                (organizer || admin) && (
                  <TableColumn className="table-col">
                    <Button
                      onClick={e => {
                        e.stopPropagation();
                        setDialog("DeleteTournament", {
                          id: t.id,
                          name: t.name
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
