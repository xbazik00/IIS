import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { withRouter } from "react-router-dom";

import TextField from "../form/TextField";
import * as Validation from "../form/Validation";
import DialogContainer from "./DialogContainer";

import { inviteUser } from "../../actions/teamActions";

const InviteUserToTeam = ({ handleSubmit, data }) => (
  <DialogContainer
    title="Pozvat uživatele do týmu"
    name="InviteUserToTeam"
    handleSubmit={handleSubmit}
    submitLabel="Pozvat"
  >
    <Field
      component={TextField}
      label="Uživatelské jméno"
      name="userName"
      validate={[Validation.required]}
    />
  </DialogContainer>
);

export default compose(
  connect(({ app: { dialog: { data }, user } }) => ({ data, user }), {
    inviteUser
  }),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const { inviteUser, data } = props;
      const { userName } = formData;

      if (await inviteUser(data.name, userName)) dialog.closeDialog();
      else
        throw new SubmissionError({
          userName: "*Pozvání se nezdařilo."
        });
    }
  }),
  reduxForm({
    form: "inviteUserToTeamDialogForm"
  })
)(InviteUserToTeam);
