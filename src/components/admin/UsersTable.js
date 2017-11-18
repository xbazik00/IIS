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

const Info = ({ history, users }) => {
  return (
    <div className="flex-row flex-center">
      <DataTable plain className="table">
        <TableHeader className="table-header">
          <TableRow className="table-row">
            <TableColumn className="table-col">Uživatelské jméno</TableColumn>
            <TableColumn className="table-col">Jméno</TableColumn>
            <TableColumn className="table-col">Příjmení</TableColumn>
            <TableColumn className="table-col">Země původu</TableColumn>
          </TableRow>
        </TableHeader>
        <TableBody className="table-body">
          {map(users, (user, i) => (
            <TableRow key={i} className="table-row">
              <TableColumn className="table-col">{user.prezdivka}</TableColumn>
              <TableColumn className="table-col">{user.jmeno}</TableColumn>
              <TableColumn className="table-col">{user.prijmeni}</TableColumn>
              <TableColumn className="table-col">
                {find(countries, c => c.value === user.zeme_puvodu)
                  ? find(countries, c => c.value === user.zeme_puvodu).label
                  : user.zeme_puvodu}
              </TableColumn>
            </TableRow>
          ))}
        </TableBody>
      </DataTable>
    </div>
  );
};

export default Info;
