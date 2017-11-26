import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";

import DialogContainer from "./DialogContainer";

import { deleteSponsor, getSponsors } from "../../actions/sponsorActions";

const DeleteSponsor = ({ handleSubmit, data }) => (
  <DialogContainer
    title="Odstranit sponzora"
    name="DeleteSponsor"
    handleSubmit={handleSubmit}
    submitLabel="Odstranit"
  >
    <p>{`Opravdu chcete odstranit sponzora${
      data && data.acronym ? ` "${data.acronym}"` : ""
    }?`}</p>
  </DialogContainer>
);

export default compose(
  connect(({ app: { user, dialog: { data } } }) => ({ user, data }), {
    deleteSponsor,
    getSponsors
  }),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const { deleteSponsor, data, history, getSponsors } = props;

      if (await deleteSponsor(data.acronym)) {
        getSponsors();
        dialog.closeDialog();
        history.push("/sponsors");
      }
    }
  }),
  reduxForm({
    form: "deleteSponsorDialogForm"
  })
)(DeleteSponsor);
