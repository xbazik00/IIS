import React from "react";
import { filter, map, find } from "lodash";
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn
} from "react-md";

import { countries } from "../../enums";

const Table = ({ history, users }) => {
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
          </TableRow>
        </TableHeader>
        <TableBody className="table-body">
          {map(filter(users, u => u.role !== "ADMIN"), (user, i) => (
            <TableRow
              key={i}
              className="table-row"
              onClick={() => history.push(`/user/${user.userName}`)}
            >
              <TableColumn className="table-col">{user.userName}</TableColumn>
              <TableColumn className="table-col">{user.firstName}</TableColumn>
              <TableColumn className="table-col">{user.surname}</TableColumn>
              <TableColumn className="table-col">
                {find(countries, c => c.value === user.country)
                  ? find(countries, c => c.value === user.country).label
                  : user.country}
              </TableColumn>
              <TableColumn className="table-col">
                {user.role === "COACH" ? "Trenér" : "Hráč"}
              </TableColumn>
              <TableColumn className="table-col">
                {user.clan ? user.clan : ""}
              </TableColumn>
            </TableRow>
          ))}
        </TableBody>
      </DataTable>
    </div>
  );
};

export default Table;
