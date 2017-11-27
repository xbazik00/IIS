import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";

import DialogContainer from "./DialogContainer";

import { deleteMatch } from "../../actions/matchActions";
import { getTournament } from "../../actions/tournamentActions";

const DeleteMatch = ({ handleSubmit, data }) => (
  <DialogContainer
    title="Odstranit zápas"
    name="DeleteMatch"
    handleSubmit={handleSubmit}
    submitLabel="Odstranit"
  >
    <p>Opravdu chcete odstranit zápas?</p>
  </DialogContainer>
);

export default compose(
  connect(({ app: { dialog: { data } } }) => ({ data }), {
    deleteMatch,
    getTournament
  }),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const { deleteMatch, data, getTournament } = props;

      if (await deleteMatch(data.id)) {
        getTournament(data.tournamentId);
        dialog.closeDialog();
      }
    }
  }),
  reduxForm({
    form: "deleteMatchDialogForm"
  })
)(DeleteMatch);
