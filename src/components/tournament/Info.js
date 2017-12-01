import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { compose, withHandlers } from "recompose";
import { Button } from "react-bootstrap";
import { Card, CardText } from "react-md";
import { forEach } from "lodash";

import { setActiveForm } from "../../actions/appActions";
import {
  updateTournament,
  getTournaments,
  getTournament
} from "../../actions/tournamentActions";

import TextField from "../form/TextField";
import SelectField from "../form/SelectField";
import * as Validation from "../form/Validation";

import { formatDate, isOrganizer } from "../../utils";

const Info = ({
  tournament,
  handleSubmit,
  setActiveForm,
  activeForm,
  user,
  history
}) => {
  const options = [{ label: "", value: "" }];
  forEach(tournament.teams, t =>
    options.push({ label: t.name, value: t.name })
  );

  return (
    <div className="flex-row flex-center">
      {activeForm === "tournamentEditForm" ? (
        <form onSubmit={handleSubmit} className="form">
          <Card className="card-page">
            <CardText>
              <Field
                component={TextField}
                label="Název"
                name="name"
                validate={[Validation.required, Validation.isShorterEqual30]}
              />
              <div className="flex-row">
                <p className="row-label">Datum konání:</p>
                <p>{formatDate(tournament.date)}</p>
              </div>
              <Field
                component={TextField}
                label="Hlavní cena"
                name="prize"
                validate={[Validation.required, Validation.isShorterEqual30]}
              />
              <div className="flex-row">
                <p className="row-label">Hra:</p>
                <p>{tournament.game}</p>
              </div>
              <Field
                component={SelectField}
                label="Vítěz"
                name="winner"
                options={options}
                validate={[Validation.isShorterEqual30]}
              />
              <div className="flex-row flex-right">
                <Button className="button" onClick={() => setActiveForm(null)}>
                  Zrušit
                </Button>
                <Button className="button" type="submit" bsStyle="primary">
                  Upravit
                </Button>
              </div>
            </CardText>
          </Card>
        </form>
      ) : (
        <Card className="card-page">
          <CardText>
            <div className="flex-row">
              <p className="row-label">Název:</p>
              <p>{tournament.name}</p>
            </div>
            <div className="flex-row">
              <p className="row-label">Datum konání:</p>
              <p>{formatDate(tournament.date)}</p>
            </div>
            <div className="flex-row">
              <p className="row-label">Hlavní cena:</p>
              <p>{tournament.prize}</p>
            </div>
            <div className="flex-row">
              <p className="row-label">Hra:</p>
              <p>
                <span
                  className="link"
                  onClick={() => history.push(`/game/${tournament.game}`)}
                >
                  {tournament.game}
                </span>
              </p>
            </div>
            <div className="flex-row">
              <p className="row-label">Vítěz:</p>
              <p>{tournament.winner}</p>
            </div>
            {isOrganizer(user.role) &&
              user.userName === tournament.id_organizer && (
                <div className="flex-row flex-center">
                  <Button
                    bsStyle="primary"
                    onClick={() => setActiveForm("tournamentEditForm")}
                    block
                  >
                    Upravit
                  </Button>
                </div>
              )}
          </CardText>
        </Card>
      )}
    </div>
  );
};

export default compose(
  connect(({ app: { form: { activeForm }, user } }) => ({ activeForm, user }), {
    setActiveForm,
    updateTournament,
    getTournaments,
    getTournament
  }),
  withHandlers({
    onSubmit: () => async (formData, dispatch, props) => {
      const {
        setActiveForm,
        updateTournament,
        getTournaments,
        getTournament,
        tournament
      } = props;
      const { name, prize, winner } = formData;

      if (
        await updateTournament(
          tournament.id,
          name,
          tournament.date,
          prize,
          tournament.game,
          winner ? winner : "",
          tournament.id_organizer
        )
      ) {
        await getTournaments();
        getTournament(tournament.id);
        setActiveForm(null);
      } else
        throw new SubmissionError({
          modes: "*Turnaj se nepodařilo aktualizovat!"
        });
    }
  }),
  reduxForm({ form: "tournamentEditForm" })
)(Info);
