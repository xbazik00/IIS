import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";

import DialogContainer from "./DialogContainer";

import { getTeamsByUserName, deleteTeam } from "../../actions/teamActions";

const DeleteTeam = ({ handleSubmit, data }) => (
  <DialogContainer
    title="Odstranit tým"
    name="DeleteTeam"
    handleSubmit={handleSubmit}
    submitLabel="Odstranit"
  >
    <p>{`Opravdu chcete odstranit tým${
      data && data.name ? ` "${data.name}"` : ""
    }?`}</p>
  </DialogContainer>
);

export default compose(
  connect(({ app: { user, dialog: { data } } }) => ({ user, data }), {
    deleteTeam,
    getTeamsByUserName
  }),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const { deleteTeam, data, history, getTeamsByUserName, user } = props;

      if (await deleteTeam(data.name)) {
        dialog.closeDialog();
        getTeamsByUserName(user.userName);
        history.push("/teams");
      }
    }
  }),
  reduxForm({
    form: "deleteTeamDialogForm"
  })
)(DeleteTeam);
