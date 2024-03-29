import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { withRouter } from "react-router-dom";

import TextField from "../form/TextField";
import DatePicker from "../form/DatePicker";
import * as Validation from "../form/Validation";
import DialogContainer from "./DialogContainer";

import { resetForm } from "../../actions/appActions";
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
      label="*Název hry"
      name="name"
      validate={[Validation.required, Validation.isShorterEqual30]}
    />
    <Field
      component={TextField}
      label="*Žánr"
      name="genre"
      validate={[Validation.required, Validation.isShorterEqual30]}
    />
    <Field
      component={TextField}
      label="*Vydavatel"
      name="publisher"
      validate={[Validation.required, Validation.isShorterEqual30]}
    />
    <Field
      component={DatePicker}
      label="*Datum vydání"
      name="created"
      validate={[Validation.required]}
    />
    <Field
      component={TextField}
      label="Módy"
      name="modes"
      componentClass="textarea"
      validate={[Validation.isShorterEqual100]}
    />
    <p>*Povinné</p>
  </DialogContainer>
);

export default compose(
  connect(({ app: { dialog: { data } } }) => ({ data }), {
    newGame,
    getGames,
    resetForm
  }),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const { newGame, getGames, resetForm } = props;
      const { name, genre, publisher, modes, created } = formData;

      if (
        await newGame(
          name,
          genre,
          publisher,
          modes ? modes : "",
          created.substring(0, 10)
        )
      ) {
        getGames();
        resetForm("newGameDialogForm");
        dialog.closeDialog();
      } else {
        throw new SubmissionError({
          name: "Hra s tímto názvem již existuje!"
        });
      }
    }
  }),
  reduxForm({
    form: "newGameDialogForm"
  })
)(NewGame);
