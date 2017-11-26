import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { withRouter } from "react-router-dom";

import TextField from "../form/TextField";
import * as Validation from "../form/Validation";
import DialogContainer from "./DialogContainer";

import { createSponsor, getSponsors } from "../../actions/sponsorActions";

const CreateSponsor = ({ handleSubmit, data }) => (
  <DialogContainer
    title="Přidat sponzora"
    name="CreateSponsor"
    handleSubmit={handleSubmit}
    submitLabel="Přidat"
  >
    <Field
      component={TextField}
      label="Přezdívka"
      name="acronym"
      validate={[Validation.required]}
    />
    <Field
      component={TextField}
      label="Název"
      name="name"
      validate={[Validation.required]}
    />
    <Field
      component={TextField}
      label="Sídlo"
      name="seat"
      validate={[Validation.required]}
    />
    <Field
      component={TextField}
      label="Číslo účtu"
      name="account_number"
      validate={[Validation.required, Validation.isNumberGTOne]}
    />
  </DialogContainer>
);

export default compose(
  connect(({ app: { dialog: { data } } }) => ({ data }), {
    createSponsor,
    getSponsors
  }),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const { createSponsor, getSponsors } = props;
      const { acronym, name, seat, account_number } = formData;

      if (await createSponsor(acronym, name, seat, account_number)) {
        getSponsors();
        dialog.closeDialog();
      } else
        throw new SubmissionError({
          acronym: "*Sponzor s touto zkratkou již existuje."
        });
    }
  }),
  reduxForm({
    form: "createSponsorDialogForm"
  })
)(CreateSponsor);
