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
  activeTeam,
  setState
}) => {
  const options = [];
  if (activeTeam && tournament)
    forEach(filter(tournament.list, t => t.game === activeTeam.game), t =>
      options.push({ label: t.name, value: t.id })
    );

  return (
    <DialogContainer
      title="Vstoupit do turnaje"
      name="AddTeamToTournament"
      handleSubmit={handleSubmit}
      submitLabel="Vstoupit"
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
      const {
        addTeamToTournament,
        data,
        getTeam,
        activeTeam,
        tournament
      } = props;
      const { id } = formData;

      if (
        activeTeam &&
        tournament &&
        !isEmpty(filter(tournament.list, t => t.game === activeTeam.game))
      ) {
        if (await addTeamToTournament(id, data.name)) {
          getTeam(data.name);
          dialog.closeDialog();
        } else
          throw new SubmissionError({
            id: "*Do turnaje se nepodařilo vstoupit!"
          });
      } else dialog.closeDialog();
    }
  }),
  reduxForm({
    form: "addTeamToTournamentDialogForm"
  })
)(AddTeamToTournament);
