import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers, withState } from "recompose";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { withRouter } from "react-router-dom";
import { forEach, isEmpty } from "lodash";

import TextField from "../form/TextField";
import SelectField from "../form/SelectField";
import DatePicker from "../form/DatePicker";
import * as Validation from "../form/Validation";
import DialogContainer from "./DialogContainer";

import { newMatch } from "../../actions/matchActions";
import { getTournament } from "../../actions/tournamentActions";

const NewMatch = ({
  handleSubmit,
  data,
  activeTournament,
  setState,
  state
}) => {
  const options = [];
  if (activeTournament)
    forEach(activeTournament.teams, t =>
      options.push({ label: t.name, value: t.name })
    );

  if (isEmpty(options)) setState(false);
  else setState(true);

  return (
    <DialogContainer
      title="Vytvořit zápas"
      name="NewMatch"
      handleSubmit={handleSubmit}
      submitLabel={state ? "Vytvořit" : "OK"}
    >
      {state ? (
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
      getTournament
    }
  ),
  withRouter,
  withState("state", "setState", false),
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const { newMatch, getTournament, data, state } = props;
      const { result, date, name1, name2 } = formData;

      if (state) {
        if (await newMatch(result, date, data.id, name1, name2)) {
          getTournament(data.id);
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
