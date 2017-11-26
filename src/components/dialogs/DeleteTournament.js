import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";

import DialogContainer from "./DialogContainer";

import {
  getTournaments,
  deleteTournament
} from "../../actions/tournamentActions";

const DeleteTournament = ({ handleSubmit, data }) => (
  <DialogContainer
    title="Odstranit turnaj"
    name="DeleteTournament"
    handleSubmit={handleSubmit}
    submitLabel="Odstranit"
  >
    <p>{`Opravdu chcete odstranit turnaj${
      data && data.name ? ` "${data.name}"` : ""
    }?`}</p>
  </DialogContainer>
);

export default compose(
  connect(({ app: { user, dialog: { data } } }) => ({ user, data }), {
    deleteTournament,
    getTournaments
  }),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const { deleteTournament, data, getTournaments } = props;

      if (await deleteTournament(data.id)) {
        getTournaments();
        dialog.closeDialog();
      }
    }
  }),
  reduxForm({
    form: "deleteTournamentDialogForm"
  })
)(DeleteTournament);
