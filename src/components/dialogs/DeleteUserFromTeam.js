import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";

import DialogContainer from "./DialogContainer";

import {
  deleteUserFromTeam,
  getTeamsByUserName,
  getTeam
} from "../../actions/teamActions";

const DeleteUserFromTeam = ({ handleSubmit, data }) => (
  <DialogContainer
    title={data && data.deleteMe ? "Opustit tým" : "Vyhodit uživatele z týmu"}
    name="DeleteUserFromTeam"
    handleSubmit={handleSubmit}
    submitLabel={data && data.deleteMe ? "Opustit tým" : "Vyhodit"}
  >
    <p>
      {data && data.deleteMe
        ? `Opravdu chcete opustit tým?`
        : `Opravdu chcete vyhodit uživatele${
            data && data.userName ? ` "${data.userName}"` : ""
          } ze svého týmu?`}
    </p>
  </DialogContainer>
);

export default compose(
  connect(({ app: { dialog: { data } } }) => ({ data }), {
    deleteUserFromTeam,
    getTeamsByUserName,
    getTeam
  }),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const {
        deleteUserFromTeam,
        data,
        getTeam,
        history,
        getTeamsByUserName
      } = props;

      if (await deleteUserFromTeam(data.name, data.userName)) {
        if (!data.deleteMe) getTeam(data.name);
        dialog.closeDialog();
        if (data.deleteMe) {
          getTeamsByUserName(data.userName);
          history.push("/teams");
        }
      }
    }
  }),
  reduxForm({
    form: "deleteUserFromTeamDialogForm"
  })
)(DeleteUserFromTeam);
