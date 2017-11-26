import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";

import DialogContainer from "./DialogContainer";

import { acceptInvitation, getInvitations } from "../../actions/teamActions";

const AcceptTeamInvitation = ({ handleSubmit, data }) => (
  <DialogContainer
    title="Vstoupit do týmu"
    name="AcceptTeamInvitation"
    handleSubmit={handleSubmit}
    submitLabel="Vstoupit"
  >
    <p>{`Přijetím pozvánky vstoupíte do týmu${
      data && data.name ? ` "${data.name}"` : ""
    }?`}</p>
  </DialogContainer>
);

export default compose(
  connect(({ app: { dialog: { data } } }) => ({ data }), {
    acceptInvitation,
    getInvitations
  }),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const { acceptInvitation, data, getInvitations } = props;

      if (await acceptInvitation(data.name, data.userName)) {
        getInvitations(data.userName);
        dialog.closeDialog();
      }
    }
  }),
  reduxForm({
    form: "acceptTeamInvitationDialogForm"
  })
)(AcceptTeamInvitation);
