import React from "react";
import { map, find } from "lodash";
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn
} from "react-md";

import { countries } from "../../enums";

const Table = ({ history, clan }) => {
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
          </TableRow>
        </TableHeader>
        <TableBody className="table-body">
          {map(clan.users, (user, i) => (
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
            </TableRow>
          ))}
        </TableBody>
      </DataTable>
    </div>
  );
};

export default Table;
