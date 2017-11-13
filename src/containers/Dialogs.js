import React from "react";
import { connect } from "react-redux";

import Info from "../components/dialogs/Info";
import CreateClan from "../components/dialogs/CreateClan";
import CreateTeam from "../components/dialogs/CreateTeam";

import { closeDialog } from "../actions/appActions";

const Dialogs = props => {
  return (
    <div>
      <Info {...props} />
      <CreateClan {...props} />
      <CreateTeam {...props} />
    </div>
  );
};

export default connect(({ app: { dialog } }) => ({ dialog }), {
  closeDialog
})(Dialogs);
