import React from "react";
import { connect } from "react-redux";
import { filter, map, find } from "lodash";
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
import { isAdmin, isPlayer, isOrganizer, isCoach } from "../../utils";

const Table = ({ history, users, user, setDialog }) => {
  const admin = user && isAdmin(user.role);
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
            <TableColumn className="table-col">Klan</TableColumn>
            {admin && <TableColumn className="table-col">Akce</TableColumn>}
          </TableRow>
        </TableHeader>
        <TableBody className="table-body">
          {map(users, (u, i) => (
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
                {isCoach(u.role)
                  ? "Trenér"
                  : isPlayer(u.role)
                    ? "Hráč"
                    : isOrganizer(u.role) ? "Organizátor" : ""}
              </TableColumn>
              <TableColumn className="table-col">
                {u.clan ? u.clan : ""}
              </TableColumn>
              {admin &&
                !isAdmin(u.role) && (
                  <TableColumn className="table-col">
                    <Button
                      onClick={e => {
                        e.stopPropagation();
                        setDialog("DeleteUser", { userName: u.userName });
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
