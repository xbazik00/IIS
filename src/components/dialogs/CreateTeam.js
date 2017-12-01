import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { withRouter } from "react-router-dom";
import { forEach, isEmpty } from "lodash";

import TextField from "../form/TextField";
import SelectField from "../form/SelectField";
import * as Validation from "../form/Validation";
import DialogContainer from "./DialogContainer";

import { resetForm } from "../../actions/appActions";
import { createTeam } from "../../actions/teamActions";

const CreateTeam = ({ handleSubmit, data, games }) => {
  const options = [];
  forEach(games, g => options.push({ label: g.name, value: g.name }));

  return (
    <DialogContainer
      title="Založit tým"
      name="CreateTeam"
      handleSubmit={handleSubmit}
      submitLabel="Založit"
    >
      <Field
        component={TextField}
        label="Název týmu"
        name="name"
        validate={[Validation.required, Validation.isShorterEqual30]}
      />
      <Field
        component={TextField}
        label="Počet hráčů"
        name="number_of_players"
        validate={[
          Validation.required,
          Validation.isNumberGTOne,
          Validation.isNumberLE1000
        ]}
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
    { createTeam, resetForm }
  ),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const { createTeam, user, resetForm } = props;
      const { name, game, number_of_players } = formData;

      if (await createTeam(name, user.userName, game, number_of_players)) {
        resetForm("createTeamDialogForm");
        dialog.closeDialog();
      } else
        throw new SubmissionError({
          game: "*Tým se nepodařilo vytvořit!"
        });
    }
  }),
  reduxForm({
    form: "createTeamDialogForm",
    enableReinitialize: true
  })
)(CreateTeam);
