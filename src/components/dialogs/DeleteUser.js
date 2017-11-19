import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";

import DialogContainer from "./DialogContainer";

import { deleteUser, getUsers } from "../../actions/usersActions";

const DeleteUser = ({ handleSubmit, data }) => (
  <DialogContainer
    title="Odstranit uživatele"
    name="DeleteUser"
    handleSubmit={handleSubmit}
    submitLabel="Odstranit"
  >
    <p>{`Opravdu chcete odstranit uživatele${
      data && data.userName ? ` "${data.userName}"` : ""
    }?`}</p>
  </DialogContainer>
);

export default compose(
  connect(({ app: { dialog: { data } } }) => ({ data }), {
    deleteUser,
    getUsers
  }),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const { deleteUser, data, getUsers } = props;

      if (await deleteUser(data.userName)) {
        dialog.closeDialog();
        getUsers();
      }
    }
  }),
  reduxForm({
    form: "deleteUserDialogForm"
  })
)(DeleteUser);
