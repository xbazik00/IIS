import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { withRouter } from "react-router-dom";
import { forEach, find, filter, isEmpty } from "lodash";

import SelectField from "../form/SelectField";
import * as Validation from "../form/Validation";
import DialogContainer from "./DialogContainer";

import { resetForm } from "../../actions/appActions";
import {
  addSponsorToTournament,
  getTournamentSponsors
} from "../../actions/sponsorActions";

const AddSponsorToTournament = ({ handleSubmit, data, sponsor, setState }) => {
  const options = [];
  if (sponsor && !isEmpty(sponsor.list) && sponsor.tournamentSponsors) {
    forEach(
      filter(
        sponsor.list,
        item =>
          !find(
            sponsor.tournamentSponsors.list,
            s => s.acronym === item.acronym
          )
      ),
      s => options.push({ label: s.acronym, value: s.acronym })
    );
  }

  return (
    <DialogContainer
      title="Přidat sponzora"
      name="AddSponsorToTournament"
      handleSubmit={handleSubmit}
      submitLabel={isEmpty(options) ? "OK" : "Přidat"}
    >
      {isEmpty(options) ? (
        <p>Žádní sponzoři nejsou k dispozici.</p>
      ) : (
        <div>
          <Field
            component={SelectField}
            label="*Zkratka"
            name="acronym"
            options={options}
            validate={[Validation.required, Validation.isShorterEqual30]}
          />
          <p>*Povinné</p>
        </div>
      )}
    </DialogContainer>
  );
};

export default compose(
  connect(({ app: { dialog: { data } }, sponsor }) => ({ data, sponsor }), {
    addSponsorToTournament,
    getTournamentSponsors,
    resetForm
  }),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const {
        addSponsorToTournament,
        getTournamentSponsors,
        data,
        sponsor,
        resetForm
      } = props;
      const { acronym } = formData;

      if (
        sponsor &&
        !isEmpty(sponsor.list) &&
        sponsor.tournamentSponsors &&
        !isEmpty(
          filter(
            sponsor.list,
            item =>
              !find(
                sponsor.tournamentSponsors.list,
                s => s.acronym === item.acronym
              )
          )
        )
      ) {
        if (await addSponsorToTournament(acronym, data.id)) {
          getTournamentSponsors(data.id);
          resetForm("addSponsorToTournamentDialogForm");
          dialog.closeDialog();
        } else
          throw new SubmissionError({
            acronym: "Nepodařilo se přidat sponzora!"
          });
      } else dialog.closeDialog();
    }
  }),
  reduxForm({
    form: "addSponsorToTournamentDialogForm"
  })
)(AddSponsorToTournament);
