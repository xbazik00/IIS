import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";

import DialogContainer from "./DialogContainer";

import { deleteGame, getGames } from "../../actions/gamesActions";

const DeleteGame = ({ handleSubmit, data }) => (
  <DialogContainer
    title="Odstranit hru"
    name="DeleteGame"
    handleSubmit={handleSubmit}
    submitLabel="Odstranit"
  >
    <p>{`Opravdu chcete odstranit hru${
      data && data.name ? ` "${data.name}"` : ""
    }?`}</p>
  </DialogContainer>
);

export default compose(
  connect(({ app: { dialog: { data } } }) => ({ data }), {
    deleteGame,
    getGames
  }),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const { deleteGame, data, history, getGames } = props;

      if (await deleteGame(data.name)) {
        dialog.closeDialog();
        getGames();
        history.push("/main");
      }
    }
  }),
  reduxForm({
    form: "deleteGameDialogForm"
  })
)(DeleteGame);
