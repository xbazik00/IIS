import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";

import DialogContainer from "./DialogContainer";

import { deleteInvitation, getInvitations } from "../../actions/teamActions";

const DeleteTeamInvitation = ({ handleSubmit, data }) => (
  <DialogContainer
    title="Odstranit pozvánku"
    name="DeleteTeamInvitation"
    handleSubmit={handleSubmit}
    submitLabel="Odstranit"
  >
    <p>{`Opravdu chcete odstranit pozvánku do týmu${
      data && data.name ? ` "${data.name}"` : ""
    }?`}</p>
  </DialogContainer>
);

export default compose(
  connect(({ app: { dialog: { data } } }) => ({ data }), {
    deleteInvitation,
    getInvitations
  }),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const { deleteInvitation, data, getInvitations } = props;

      if (await deleteInvitation(data.name, data.userName)) {
        getInvitations(data.userName);
        dialog.closeDialog();
      }
    }
  }),
  reduxForm({
    form: "deleteTeamInvitationDialogForm"
  })
)(DeleteTeamInvitation);
