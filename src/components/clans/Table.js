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

import { isAdmin } from "../../utils";

const Table = ({ history, clans, user, setDialog }) => {
  const admin = user && isAdmin(user.role);
  return (
    <div className="flex-row flex-center">
      <DataTable plain className="table">
        <TableHeader className="table-header">
          <TableRow className="table-row">
            <TableColumn className="table-col">Tag</TableColumn>
            <TableColumn className="table-col">Název</TableColumn>
            <TableColumn className="table-col">Logo</TableColumn>
            <TableColumn className="table-col">Hymna</TableColumn>
            <TableColumn className="table-col">Země působení</TableColumn>
            <TableColumn className="table-col">Vůdce</TableColumn>
            {user &&
              admin && <TableColumn className="table-col">Akce</TableColumn>}
          </TableRow>
        </TableHeader>
        <TableBody className="table-body">
          {map(clans, (c, i) => (
            <TableRow
              key={i}
              className="table-row"
              onClick={() => history.push(`/clan/${c.tag}`)}
            >
              <TableColumn className="table-col">{c.tag}</TableColumn>
              <TableColumn className="table-col">{c.name}</TableColumn>
              <TableColumn className="table-col">{c.logo}</TableColumn>
              <TableColumn className="table-col">{c.anthem}</TableColumn>
              <TableColumn className="table-col">{c.country}</TableColumn>
              <TableColumn className="table-col">{c.boss}</TableColumn>
              {user &&
                admin && (
                  <TableColumn className="table-col">
                    <Button
                      onClick={e => {
                        e.stopPropagation();
                        setDialog("DeleteClan", {
                          tag: c.tag
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
