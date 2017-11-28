import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";

import DialogContainer from "./DialogContainer";

import { deleteClan } from "../../actions/clanActions";
import { getUser } from "../../actions/usersActions";

const DeleteClan = ({ handleSubmit, data }) => (
  <DialogContainer
    title="Odstranit klan"
    name="DeleteClan"
    handleSubmit={handleSubmit}
    submitLabel="Odstranit"
  >
    <p>{`Opravdu chcete odstranit klan${
      data && data.tag ? ` "${data.tag}"` : ""
    }?`}</p>
  </DialogContainer>
);

export default compose(
  connect(({ app: { user, dialog: { data } } }) => ({ user, data }), {
    deleteClan,
    getUser
  }),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const { deleteClan, data, history, getUser, user } = props;

      if (await deleteClan(data.tag)) {
        dialog.closeDialog();
        getUser(user.userName);
        history.push("/main");
      }
    }
  }),
  reduxForm({
    form: "deleteClanDialogForm"
  })
)(DeleteClan);
