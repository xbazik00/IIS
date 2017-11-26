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

import { isOrganizer } from "../../utils";

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
      const { deleteTournament, data, getTournaments, history, user } = props;

      if (await deleteTournament(data.id)) {
        getTournaments();
        dialog.closeDialog();
        if (isOrganizer(user.role)) history.push("/main");
        else history.push("/tournaments");
      }
    }
  }),
  reduxForm({
    form: "deleteTournamentDialogForm"
  })
)(DeleteTournament);
