import React from "react";
import { connect } from "react-redux";

import Info from "../components/dialogs/Info";
import CreateClan from "../components/dialogs/CreateClan";
import CreateTeam from "../components/dialogs/CreateTeam";
import InviteUserToClan from "../components/dialogs/InviteUserToClan";
import DeleteClan from "../components/dialogs/DeleteClan";
import DeleteUserFromClan from "../components/dialogs/DeleteUserFromClan";
import DeleteGame from "../components/dialogs/DeleteGame";
import NewGame from "../components/dialogs/NewGame";
import DeleteUser from "../components/dialogs/DeleteUser";
import AcceptClanInvitation from "../components/dialogs/AcceptClanInvitation";
import DeleteClanInvitation from "../components/dialogs/DeleteClanInvitation";
import Registration from "../components/dialogs/Registration";
import DeleteTeam from "../components/dialogs/DeleteTeam";
import InviteUserToTeam from "../components/dialogs/InviteUserToTeam";
import AcceptTeamInvitation from "../components/dialogs/AcceptTeamInvitation";
import DeleteTeamInvitation from "../components/dialogs/DeleteTeamInvitation";
import DeleteUserFromTeam from "../components/dialogs/DeleteUserFromTeam";

import { closeDialog } from "../actions/appActions";

const Dialogs = props => {
  return (
    <div>
      <Info {...props} />
      <CreateClan {...props} />
      <CreateTeam {...props} />
      <InviteUserToClan {...props} />
      <DeleteClan {...props} />
      <DeleteUserFromClan {...props} />
      <DeleteGame {...props} />
      <NewGame {...props} />
      <DeleteUser {...props} />
      <AcceptClanInvitation {...props} />
      <DeleteClanInvitation {...props} />
      <Registration {...props} />
      <DeleteTeam {...props} />
      <InviteUserToTeam {...props} />
      <AcceptTeamInvitation {...props} />
      <DeleteTeamInvitation {...props} />
      <DeleteUserFromTeam {...props} />
    </div>
  );
};

export default connect(({ app: { dialog } }) => ({ dialog }), {
  closeDialog
})(Dialogs);
