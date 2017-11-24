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

import { formatTime } from "../../utils";

const Table = ({ history, invitations, setDialog }) => {
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
                  <Button
                    onClick={() =>
                      setDialog("AcceptClanInvitation", {
                        tag: invitation.tag,
                        userName: invitation.userName
                      })
                    }
                  >
                    <Glyphicon glyph="ok" />
                  </Button>
                  <Button
                    onClick={() =>
                      setDialog("DeleteClanInvitation", {
                        tag: invitation.tag,
                        userName: invitation.userName
                      })
                    }
                  >
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

export default connect(null, { setDialog })(Table);
