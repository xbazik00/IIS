import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm, Field } from "redux-form";
import { withRouter } from "react-router-dom";
import { forEach, isEmpty } from "lodash";

import TextField from "../form/TextField";
import SelectField from "../form/SelectField";
import DatePicker from "../form/DatePicker";
import * as Validation from "../form/Validation";
import DialogContainer from "./DialogContainer";

import {
  createTournament,
  getTournaments
} from "../../actions/tournamentActions";

const AddTournament = ({ handleSubmit, data, games }) => {
  const options = [];
  forEach(games, g => options.push({ label: g.name, value: g.name }));

  return (
    <DialogContainer
      title="Vytvořit turnaj"
      name="AddTournament"
      handleSubmit={handleSubmit}
      submitLabel="Vytvořit"
    >
      <Field
        component={TextField}
        label="Název turnaje"
        name="name"
        validate={[Validation.required, Validation.isShorterEqual30]}
      />
      <Field
        component={DatePicker}
        label="Datum pořádání"
        name="date"
        validate={[Validation.required]}
      />
      <Field
        component={TextField}
        label="Hlavní cena"
        name="prize"
        validate={[Validation.required, Validation.isShorterEqual30]}
      />
      <Field
        component={SelectField}
        label="Hra"
        name="game"
        options={options}
        validate={[Validation.required]}
      />
    </DialogContainer>
  );
};

export default compose(
  connect(
    ({ app: { user, dialog: { data } }, games: { list } }) => ({
      user,
      data,
      games: list,
      initialValues: { game: !isEmpty(list) ? list[0].name : null }
    }),
    { createTournament, getTournaments }
  ),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const { createTournament, user, getTournaments } = props;
      const { name, date, prize, game } = formData;

      if (await createTournament(name, date, prize, game, "", user.userName)) {
        getTournaments();
        dialog.closeDialog();
      }
    }
  }),
  reduxForm({
    form: "addTournamentDialogForm",
    enableReinitialize: true
  })
)(AddTournament);
