import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers, withState } from "recompose";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { withRouter } from "react-router-dom";
import { forEach, find, filter, isEmpty } from "lodash";

import SelectField from "../form/SelectField";
import * as Validation from "../form/Validation";
import DialogContainer from "./DialogContainer";

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

  if (isEmpty(options)) setState(false);
  else setState(true);

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
        <Field
          component={SelectField}
          label="Zkratka"
          name="acronym"
          options={options}
          validate={[Validation.required, Validation.isShorterEqual30]}
        />
      )}
    </DialogContainer>
  );
};

export default compose(
  connect(({ app: { dialog: { data } }, sponsor }) => ({ data, sponsor }), {
    addSponsorToTournament,
    getTournamentSponsors
  }),
  withRouter,
  withState("state", "setState", false),
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const {
        addSponsorToTournament,
        getTournamentSponsors,
        data,
        state
      } = props;
      const { acronym } = formData;

      if (state) {
        if (await addSponsorToTournament(acronym, data.id)) {
          getTournamentSponsors(data.id);
          dialog.closeDialog();
        } else
          throw new SubmissionError({
            acronym: "*Nepodařilo se přidat sponzora!"
          });
      } else dialog.closeDialog();
    }
  }),
  reduxForm({
    form: "addSponsorToTournamentDialogForm"
  })
)(AddSponsorToTournament);
