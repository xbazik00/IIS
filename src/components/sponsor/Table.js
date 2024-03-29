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

import { isAdmin, isOrganizer } from "../../utils";

const Table = ({
  history,
  sponsors,
  setDialog,
  user,
  clan,
  clanSponsors,
  tournamentSponsors,
  tournament,
  adminZone
}) => {
  const admin = user && isAdmin(user.role);
  const organizer = user && isOrganizer(user.role);
  return (
    <div className="flex-row flex-center">
      <DataTable plain className="table">
        <TableHeader className="table-header">
          <TableRow className="table-row">
            <TableColumn className="table-col">Zkratka</TableColumn>
            <TableColumn className="table-col">Název</TableColumn>
            <TableColumn className="table-col">Sídlo</TableColumn>
            <TableColumn className="table-col">Číslo účtu</TableColumn>
            {((adminZone && admin) ||
              (clanSponsors && clan && clan.boss === user.userName) ||
              (tournamentSponsors && organizer)) && (
              <TableColumn className="table-col">Akce</TableColumn>
            )}
          </TableRow>
        </TableHeader>
        {sponsors && (
          <TableBody className="table-body">
            {map(sponsors, (sponsor, i) => (
              <TableRow key={i} className="table-row">
                <TableColumn className="table-col">
                  {sponsor.acronym}
                </TableColumn>
                <TableColumn className="table-col">{sponsor.name}</TableColumn>
                <TableColumn className="table-col">{sponsor.seat}</TableColumn>
                <TableColumn className="table-col">
                  {sponsor.account_number}
                </TableColumn>
                {((adminZone && admin) ||
                  (clanSponsors && clan && clan.boss === user.userName) ||
                  (tournamentSponsors && organizer)) && (
                  <TableColumn className="table-col">
                    {((tournamentSponsors && organizer) ||
                      (!tournamentSponsors && (admin || clanSponsors))) && (
                      <Button
                        onClick={() => {
                          if (admin)
                            setDialog("DeleteSponsor", {
                              acronym: sponsor.acronym
                            });
                          else if (clanSponsors && clan.boss === user.userName)
                            setDialog("DeleteSponsorFromClan", {
                              acronym: sponsor.acronym,
                              tag: clan.tag
                            });
                          else if (tournamentSponsors && organizer)
                            setDialog("DeleteSponsorFromTournament", {
                              acronym: sponsor.acronym,
                              id: tournament.id
                            });
                        }}
                      >
                        <Glyphicon glyph="remove" />
                      </Button>
                    )}
                  </TableColumn>
                )}
              </TableRow>
            ))}
          </TableBody>
        )}
      </DataTable>
    </div>
  );
};

export default connect(null, { setDialog })(Table);
