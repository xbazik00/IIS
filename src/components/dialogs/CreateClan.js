import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm, Field } from "redux-form";
import { withRouter } from "react-router-dom";

import TextField from "../form/TextField";
import * as Validation from "../form/Validation";
import DialogContainer from "./DialogContainer";

const CreateClan = ({ handleSubmit, data }) => (
  <DialogContainer
    title="Založit klan"
    name="CreateClan"
    handleSubmit={handleSubmit}
    submitLabel="Založit"
  >
    <form onSubmit={handleSubmit}>
      <Field
        component={TextField}
        label="Název klanu"
        name="name"
        validate={[Validation.required]}
      />
    </form>
  </DialogContainer>
);

export default compose(
  connect(({ app: { dialog: { data } } }) => ({ data }), null),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      dialog.closeDialog();
    }
  }),
  reduxForm({
    form: "createClanDialogForm"
  })
)(CreateClan);
