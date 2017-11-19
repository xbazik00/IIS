import React from "react";
import { map } from "lodash";
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn
} from "react-md";
import { Button, Glyphicon } from "react-bootstrap";

import { formatTime } from "../../utils";

const Table = ({ history, invitations }) => {
  return (
    <div className="flex-row flex-center">
      <DataTable plain className="table">
        <TableHeader className="table-header">
          <TableRow className="table-row">
            <TableColumn className="table-col">Klan</TableColumn>
            <TableColumn className="table-col">Datum a čas pozvání</TableColumn>
            <TableColumn className="table-col">Akce</TableColumn>
          </TableRow>
        </TableHeader>
        {invitations && (
          <TableBody className="table-body">
            {map(invitations.items, (invitation, i) => (
              <TableRow key={i} className="table-row">
                <TableColumn className="table-col">
                  <span
                    className="link"
                    onClick={() => history.push(`/clan/${invitation.tag}`)}
                  >
                    {invitation.tag}
                  </span>
                </TableColumn>
                <TableColumn className="table-col">
                  {formatTime(invitation.created)}
                </TableColumn>
                <TableColumn className="table-col">
                  <Button onClick={() => null}>
                    <Glyphicon glyph="ok" />
                  </Button>
                  <Button onClick={() => null}>
                    <Glyphicon glyph="remove" />
                  </Button>
                </TableColumn>
              </TableRow>
            ))}
          </TableBody>
        )}
      </DataTable>
    </div>
  );
};

export default Table;
