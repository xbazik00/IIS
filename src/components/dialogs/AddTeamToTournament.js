import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { withRouter } from "react-router-dom";
import { forEach, filter, isEmpty } from "lodash";

import SelectField from "../form/SelectField";
import * as Validation from "../form/Validation";
import DialogContainer from "./DialogContainer";

import { addTeamToTournament } from "../../actions/tournamentActions";
import { getTeam } from "../../actions/teamActions";

const AddTeamToTournament = ({
  handleSubmit,
  data,
  tournament,
  activeTeam
}) => {
  const options = [];
  forEach(filter(tournament.list, t => t.game === activeTeam.game), t =>
    options.push({ label: t.name, value: t.id })
  );

  return (
    <DialogContainer
      title="Založit klan"
      name="AddTeamToTournament"
      handleSubmit={handleSubmit}
      submitLabel="Založit"
    >
      {isEmpty(options) ? (
        <p>Nejsou k dispozici žádné turnaje.</p>
      ) : (
        <Field
          component={SelectField}
          label="Turnaj"
          name="id"
          options={options}
          validate={[Validation.required]}
        />
      )}
    </DialogContainer>
  );
};

export default compose(
  connect(
    ({
      app: { dialog: { data }, user },
      tournament,
      team: { activeTeam }
    }) => ({ data, user, tournament, activeTeam }),
    {
      addTeamToTournament,
      getTeam
    }
  ),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const { addTeamToTournament, data, getTeam } = props;
      const { id } = formData;

      if (await addTeamToTournament(id, data.name)) {
        getTeam(data.name);
        dialog.closeDialog();
      } else
        throw new SubmissionError({
          id: "*Do turnaje se nepodařilo vstoupit!"
        });
    }
  }),
  reduxForm({
    form: "addTeamToTournamentDialogForm"
  })
)(AddTeamToTournament);
