import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";

import DialogContainer from "./DialogContainer";

import {
  deleteTeamFromTournament,
  getTournament
} from "../../actions/tournamentActions";

const DeleteTeamFromTournament = ({ handleSubmit, data }) => (
  <DialogContainer
    title="Odstranit tým z turnaje"
    name="DeleteTeamFromTournament"
    handleSubmit={handleSubmit}
    submitLabel="Odstranit"
  >
    <p>
      {`Opravdu chcete odstranit tým${
        data && data.name ? ` "${data.name}"` : ""
      } z turnaje?`}
    </p>
  </DialogContainer>
);

export default compose(
  connect(({ app: { dialog: { data } } }) => ({ data }), {
    deleteTeamFromTournament,
    getTournament
  }),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const { deleteTeamFromTournament, data, getTournament } = props;

      if (await deleteTeamFromTournament(data.id, data.name)) {
        getTournament(data.id);
        dialog.closeDialog();
      }
    }
  }),
  reduxForm({
    form: "deleteTeamFromTournamentDialogForm"
  })
)(DeleteTeamFromTournament);
