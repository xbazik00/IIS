import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";

import DialogContainer from "./DialogContainer";

import {
  deleteSponsorFromTournament,
  getTournamentSponsors
} from "../../actions/sponsorActions";

const DeleteSponsorFromTournament = ({ handleSubmit, data }) => (
  <DialogContainer
    title="Odstranit sponzora turnaje"
    name="DeleteSponsorFromTournament"
    handleSubmit={handleSubmit}
    submitLabel="Odstranit"
  >
    <p>
      {`Opravdu chcete odstranit sponzora${
        data && data.acronym ? ` "${data.acronym}"` : ""
      } ze svého turnaje?`}
    </p>
  </DialogContainer>
);

export default compose(
  connect(({ app: { dialog: { data } } }) => ({ data }), {
    deleteSponsorFromTournament,
    getTournamentSponsors
  }),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const {
        deleteSponsorFromTournament,
        data,
        getTournamentSponsors
      } = props;

      if (await deleteSponsorFromTournament(data.acronym, data.id)) {
        getTournamentSponsors(data.id);
        dialog.closeDialog();
      }
    }
  }),
  reduxForm({
    form: "deleteSponsorFromTournamentDialogForm"
  })
)(DeleteSponsorFromTournament);
