import React from "react";
import { connect } from "react-redux";
import { map, find } from "lodash";
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn
} from "react-md";
import { Button, Glyphicon } from "react-bootstrap";

import { setDialog } from "../../actions/appActions";

import { countries } from "../../enums";

const Table = ({ history, clan, setDialog, user }) => {
  return (
    <div className="flex-row flex-center">
      <DataTable plain className="table">
        <TableHeader className="table-header">
          <TableRow className="table-row">
            <TableColumn className="table-col">Uživatelské jméno</TableColumn>
            <TableColumn className="table-col">Jméno</TableColumn>
            <TableColumn className="table-col">Příjmení</TableColumn>
            <TableColumn className="table-col">Země původu</TableColumn>
            <TableColumn className="table-col">Role</TableColumn>
            {clan.boss === user.userName && (
              <TableColumn className="table-col">Akce</TableColumn>
            )}
          </TableRow>
        </TableHeader>
        <TableBody className="table-body">
          {map(clan.users, (u, i) => (
            <TableRow
              key={i}
              className="table-row"
              onClick={() => history.push(`/user/${u.userName}`)}
            >
              <TableColumn className="table-col">{u.userName}</TableColumn>
              <TableColumn className="table-col">{u.firstName}</TableColumn>
              <TableColumn className="table-col">{u.surname}</TableColumn>
              <TableColumn className="table-col">
                {find(countries, c => c.value === u.country)
                  ? find(countries, c => c.value === u.country).label
                  : u.country}
              </TableColumn>
              <TableColumn className="table-col">
                {u.role === "COACH" ? "Trenér" : "Hráč"}
              </TableColumn>
              {clan.boss === user.userName &&
                (clan.boss !== u.userName ? (
                  <TableColumn className="table-col">
                    <Button
                      onClick={e => {
                        e.stopPropagation();
                        setDialog("DeleteUserFromClan", {
                          tag: clan.tag,
                          userName: u.userName
                        });
                      }}
                    >
                      <Glyphicon glyph="remove" />
                    </Button>
                  </TableColumn>
                ) : (
                  <TableColumn className="table-col" />
                ))}
            </TableRow>
          ))}
        </TableBody>
      </DataTable>
    </div>
  );
};

export default connect(null, { setDialog })(Table);
