import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";

import DialogContainer from "./DialogContainer";

import { signOut } from "../../actions/appActions";
import { deleteUser, getUsers } from "../../actions/usersActions";

const DeleteUser = ({ handleSubmit, data }) => (
  <DialogContainer
    title={data && data.deleteMe ? "Zrušit účet" : "Odstranit uživatele"}
    name="DeleteUser"
    handleSubmit={handleSubmit}
    submitLabel={data && data.deleteMe ? "Zrušit účet" : "Odstranit"}
  >
    <p>
      {data && data.deleteMe
        ? "Opravdu chcete zrušit účet?"
        : `Opravdu chcete odstranit uživatele${
            data && data.userName ? ` "${data.userName}"` : ""
          }?`}
    </p>
  </DialogContainer>
);

export default compose(
  connect(({ app: { dialog: { data } } }) => ({ data }), {
    deleteUser,
    getUsers,
    signOut
  }),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const { deleteUser, data, getUsers, signOut, history } = props;

      if (await deleteUser(data.userName)) {
        if (data.deleteMe) {
          signOut();
          history.push("/");
        } else getUsers();
        dialog.closeDialog();
      }
    }
  }),
  reduxForm({
    form: "deleteUserDialogForm"
  })
)(DeleteUser);
