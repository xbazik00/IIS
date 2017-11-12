import React from "react";
import { connect } from "react-redux";

import Info from "../components/dialogs/Info";
import CreateClan from "../components/dialogs/CreateClan";

import { closeDialog } from "../actions/appActions";

const Dialogs = props => {
  return (
    <div>
      <Info {...props} />
      <CreateClan {...props} />
    </div>
  );
};

export default connect(({ app: { dialog } }) => ({ dialog }), {
  closeDialog
})(Dialogs);
