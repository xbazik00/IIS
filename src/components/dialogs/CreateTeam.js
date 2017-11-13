import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm, Field } from "redux-form";
import { withRouter } from "react-router-dom";

import TextField from "../form/TextField";
import SelectField from "../form/SelectField";
import * as Validation from "../form/Validation";
import DialogContainer from "./DialogContainer";

const games = [
  { value: "Hra", label: "Hra" },
  { value: "Fotbal", label: "Fotbal" },
  { value: "Basketbal", label: "Basketbal" }
];

const CreateTeam = ({ handleSubmit, data }) => (
  <DialogContainer
    title="Založit tým"
    name="CreateTeam"
    handleSubmit={handleSubmit}
    submitLabel="Založit"
  >
    <form onSubmit={handleSubmit}>
      <Field
        component={TextField}
        label="Název týmu"
        name="name"
        validate={[Validation.required]}
      />
      <Field
        component={TextField}
        label="Počet hráčů"
        name="numberOfPlayers"
        validate={[Validation.required, Validation.isNumberGTOne]}
      />
      <Field
        component={SelectField}
        label="Hra"
        name="game"
        options={games}
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
    form: "createTeamDialogForm"
  })
)(CreateTeam);
