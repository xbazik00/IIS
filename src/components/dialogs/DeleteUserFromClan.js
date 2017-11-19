import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";

import DialogContainer from "./DialogContainer";

import { deleteUserFromClan, getClan } from "../../actions/clanActions";

const DeleteUserFromClan = ({ handleSubmit, data }) => (
  <DialogContainer
    title="Vyhodit uživatele z klanu"
    name="DeleteUserFromClan"
    handleSubmit={handleSubmit}
    submitLabel="Vyhodit"
  >
    <p>{`Opravdu chcete vyhodit uživatele${
      data && data.userName ? ` "${data.userName}"` : ""
    } ze svého klanu?`}</p>
  </DialogContainer>
);

export default compose(
  connect(({ app: { dialog: { data } } }) => ({ data }), {
    deleteUserFromClan,
    getClan
  }),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const { deleteUserFromClan, data, getClan } = props;

      if (await deleteUserFromClan(data.tag, data.userName)) {
        getClan(data.tag);
        dialog.closeDialog();
      }
    }
  }),
  reduxForm({
    form: "deleteUserFromClanDialogForm"
  })
)(DeleteUserFromClan);
