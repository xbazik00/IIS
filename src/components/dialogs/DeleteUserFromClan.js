import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";

import DialogContainer from "./DialogContainer";

import { deleteUserFromClan, getClan } from "../../actions/clanActions";
import { getUser } from "../../actions/usersActions";

const DeleteUserFromClan = ({ handleSubmit, data }) => (
  <DialogContainer
    title={data && data.deleteMe ? "Opustit klan" : "Vyhodit uživatele z klanu"}
    name="DeleteUserFromClan"
    handleSubmit={handleSubmit}
    submitLabel={data && data.deleteMe ? "Opustit klan" : "Vyhodit"}
  >
    <p>
      {data && data.deleteMe
        ? `Opravdu chcete opustit klan?`
        : `Opravdu chcete vyhodit uživatele${
            data && data.userName ? ` "${data.userName}"` : ""
          } ze svého klanu?`}
    </p>
  </DialogContainer>
);

export default compose(
  connect(({ app: { dialog: { data } } }) => ({ data }), {
    deleteUserFromClan,
    getClan,
    getUser
  }),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const { deleteUserFromClan, data, getClan, history, getUser } = props;

      if (await deleteUserFromClan(data.tag, data.userName)) {
        if (!data.deleteMe) getClan(data.tag);
        dialog.closeDialog();
        if (data.deleteMe) {
          getUser(data.userName);
          history.push("/main");
        }
      }
    }
  }),
  reduxForm({
    form: "deleteUserFromClanDialogForm"
  })
)(DeleteUserFromClan);
