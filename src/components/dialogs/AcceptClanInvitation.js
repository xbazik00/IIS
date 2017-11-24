import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";

import DialogContainer from "./DialogContainer";

import { acceptInvitation } from "../../actions/clanActions";
import { getUser } from "../../actions/usersActions";

const AcceptClanInvitation = ({ handleSubmit, data }) => (
  <DialogContainer
    title="Vstoupit do klanu"
    name="AcceptClanInvitation"
    handleSubmit={handleSubmit}
    submitLabel="Vstoupit"
  >
    <p>{`Přijetím pozvánky vstoupíte do klanu${
      data && data.tag ? ` "${data.tag}"` : ""
    }?`}</p>
  </DialogContainer>
);

export default compose(
  connect(({ app: { dialog: { data } } }) => ({ data }), {
    acceptInvitation,
    getUser
  }),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const { acceptInvitation, data, history, getUser } = props;

      if (await acceptInvitation(data.tag, data.userName)) {
        dialog.closeDialog();
        getUser(data.userName);
        history.push("/main");
      }
    }
  }),
  reduxForm({
    form: "acceptClanInvitationDialogForm"
  })
)(AcceptClanInvitation);
