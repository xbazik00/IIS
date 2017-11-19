import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { withRouter } from "react-router-dom";

import TextField from "../form/TextField";
import DatePicker from "../form/DatePicker";
import * as Validation from "../form/Validation";
import DialogContainer from "./DialogContainer";

import { newGame, getGames } from "../../actions/gamesActions";

const NewGame = ({ handleSubmit, data, created, setCreated }) => (
  <DialogContainer
    title="Vytvořit hru"
    name="NewGame"
    handleSubmit={handleSubmit}
    submitLabel="Vytvořit"
  >
    <Field
      component={TextField}
      label="Název hry"
      name="name"
      validate={[Validation.required]}
    />
    <Field
      component={TextField}
      label="Žánr"
      name="genre"
      validate={[Validation.required]}
    />
    <Field
      component={TextField}
      label="Vydavatel"
      name="publisher"
      validate={[Validation.required]}
    />
    <Field
      component={DatePicker}
      label="Datum vydání"
      name="created"
      validate={[Validation.required]}
    />
    <Field
      component={TextField}
      label="Módy"
      name="modes"
      componentClass="textarea"
    />
  </DialogContainer>
);

export default compose(
  connect(({ app: { dialog: { data } } }) => ({ data }), { newGame, getGames }),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const { newGame, getGames } = props;
      const { name, genre, publisher, modes, created } = formData;

      if (
        await newGame(name, genre, publisher, modes, created.substring(0, 10))
      ) {
        getGames();
        dialog.closeDialog();
      } else {
        throw new SubmissionError({
          name: "*Hra s tímto názvem již existuje!"
        });
      }
    }
  }),
  reduxForm({
    form: "newGameDialogForm"
  })
)(NewGame);
