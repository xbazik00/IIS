import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { withRouter } from "react-router-dom";
import { forEach, isEmpty } from "lodash";

import TextField from "../form/TextField";
import SelectField from "../form/SelectField";
import DatePicker from "../form/DatePicker";
import * as Validation from "../form/Validation";
import DialogContainer from "./DialogContainer";

import { resetForm } from "../../actions/appActions";
import { newMatch } from "../../actions/matchActions";
import { getTournament } from "../../actions/tournamentActions";

const NewMatch = ({ handleSubmit, data, activeTournament, setState }) => {
  const options = [];
  if (activeTournament)
    forEach(activeTournament.teams, t =>
      options.push({ label: t.name, value: t.name })
    );

  return (
    <DialogContainer
      title="Vytvořit zápas"
      name="NewMatch"
      handleSubmit={handleSubmit}
      submitLabel={!isEmpty(options) ? "Vytvořit" : "OK"}
    >
      {!isEmpty(options) ? (
        <div>
          <Field
            component={DatePicker}
            label="Datum konání"
            name="date"
            validate={[Validation.required]}
          />
          <Field
            component={SelectField}
            label="Tým 1"
            name="name1"
            options={options}
            validate={[Validation.required]}
          />
          <Field
            component={SelectField}
            label="Tým 2"
            name="name2"
            options={options}
            validate={[Validation.required]}
          />
          <Field
            component={TextField}
            label="Výsledek"
            name="result"
            validate={[Validation.isShorterEqual30]}
          />
        </div>
      ) : (
        <p>V turnaji nejsou žádné týmy pro zaháhjení zápasu.</p>
      )}
    </DialogContainer>
  );
};

export default compose(
  connect(
    ({ app: { dialog: { data } }, tournament: { activeTournament } }) => ({
      data,
      activeTournament
    }),
    {
      newMatch,
      getTournament,
      resetForm
    }
  ),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const {
        newMatch,
        getTournament,
        data,
        activeTournament,
        resetForm
      } = props;
      const { result, date, name1, name2 } = formData;

      if (activeTournament && !isEmpty(activeTournament.teams)) {
        if (await newMatch(result, date, data.id, name1, name2)) {
          getTournament(data.id);
          resetForm("newMatchDialogForm");
          dialog.closeDialog();
        } else {
          throw new SubmissionError({
            result: "*Zápas se nepodařilo vytvořit!"
          });
        }
      } else dialog.closeDialog();
    }
  }),
  reduxForm({
    form: "newMatchDialogForm"
  })
)(NewMatch);
