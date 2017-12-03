import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { withRouter } from "react-router-dom";

import TextField from "../form/TextField";
import SelectField from "../form/SelectField";
import * as Validation from "../form/Validation";
import DialogContainer from "./DialogContainer";

import { resetForm } from "../../actions/appActions";
import { createClan, getClan } from "../../actions/clanActions";
import { getUser } from "../../actions/usersActions";

import { countries } from "../../enums";

const CreateClan = ({ handleSubmit, data }) => (
  <DialogContainer
    title="Založit klan"
    name="CreateClan"
    handleSubmit={handleSubmit}
    submitLabel="Založit"
  >
    <Field
      component={TextField}
      label="*Tag klanu"
      name="tag"
      validate={[Validation.required, Validation.isShorterEqual30]}
    />
    <Field
      component={TextField}
      label="*Název klanu"
      name="name"
      validate={[Validation.required, Validation.isShorterEqual30]}
    />
    <Field
      component={TextField}
      label="*Logo"
      name="logo"
      validate={[Validation.required, Validation.isShorterEqual30]}
    />
    <Field
      component={TextField}
      label="*Hymna"
      name="anthem"
      validate={[Validation.required, Validation.isShorterEqual30]}
    />
    <Field
      component={SelectField}
      label="*Země působení"
      name="country"
      options={countries}
      validate={[Validation.required]}
    />
    <p>*Povinné</p>
  </DialogContainer>
);

export default compose(
  connect(({ app: { dialog: { data }, user } }) => ({ data, user }), {
    createClan,
    getClan,
    getUser,
    resetForm
  }),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const { createClan, user, getClan, getUser, resetForm } = props;
      const { tag, name, logo, anthem, country } = formData;

      if (await createClan(tag, name, logo, anthem, country, user.userName)) {
        getUser(user.userName);
        getClan(tag);
        resetForm("createClanDialogForm");
        dialog.closeDialog();
      } else
        throw new SubmissionError({
          tag: "Klan s tímto tagem již existuje."
        });
    }
  }),
  reduxForm({
    form: "createClanDialogForm"
  })
)(CreateClan);
