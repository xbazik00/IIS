import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";

import DialogContainer from "./DialogContainer";

import {
  deleteSponsorFromClan,
  getSponsorsByClanTag
} from "../../actions/sponsorActions";

const DeleteSponsorFromClan = ({ handleSubmit, data }) => (
  <DialogContainer
    title="Odstranit sponzora klanu"
    name="DeleteSponsorFromClan"
    handleSubmit={handleSubmit}
    submitLabel="Odstranit"
  >
    <p>
      {`Opravdu chcete odstranit sponzora${
        data && data.acronym ? ` "${data.acronym}"` : ""
      } ze svého klanu?`}
    </p>
  </DialogContainer>
);

export default compose(
  connect(({ app: { dialog: { data } } }) => ({ data }), {
    deleteSponsorFromClan,
    getSponsorsByClanTag
  }),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const { deleteSponsorFromClan, data, getSponsorsByClanTag } = props;

      if (await deleteSponsorFromClan(data.acronym, data.tag)) {
        getSponsorsByClanTag(data.tag);
        dialog.closeDialog();
      }
    }
  }),
  reduxForm({
    form: "deleteSponsorFromClanDialogForm"
  })
)(DeleteSponsorFromClan);
