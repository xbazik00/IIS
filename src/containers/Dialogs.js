import React from "react";
import { connect } from "react-redux";

import Info from "../components/dialogs/Info";

import { closeDialog } from "../actions/appActions";

const Dialogs = props => {
  return (
    <div>
      <Info {...props} />
    </div>
  );
};

export default connect(({ app: { dialog } }) => ({ dialog }), {
  closeDialog
})(Dialogs);
