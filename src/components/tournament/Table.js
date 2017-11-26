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

const Table = ({ history, tournament, user, setDialog }) => {
  const organizer = user && isOrganizer(user.role);
  return (
    <div className="flex-row flex-center">
      <DataTable plain className="table">
        <TableHeader className="table-header">
          <TableRow className="table-row">
            <TableColumn className="table-col">Název</TableColumn>
            <TableColumn className="table-col">
              Maximální počet hráčů
            </TableColumn>
            {organizer && <TableColumn className="table-col">Akce</TableColumn>}
          </TableRow>
        </TableHeader>
        <TableBody className="table-body">
          {map(tournament.teams, (t, i) => (
            <TableRow
              key={i}
              className="table-row"
              onClick={() => history.push(`/team/${t.name}`)}
            >
              <TableColumn className="table-col">{t.name}</TableColumn>
              <TableColumn className="table-col">
                {t.number_of_players}
              </TableColumn>
              {organizer && (
                <TableColumn className="table-col">
                  <Button
                    onClick={e => {
                      e.stopPropagation();
                      setDialog("DeleteTeamFromTournament", {
                        name: t.name,
                        id: tournament.id
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
