import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { compose, withHandlers } from "recompose";
import { Button } from "react-bootstrap";
import { Card, CardText } from "react-md";

import { setActiveForm } from "../../actions/appActions";
import { updateGame, getGames, getGame } from "../../actions/gamesActions";

import TextField from "../form/TextField";
import * as Validation from "../form/Validation";

import { formatDate, isAdmin } from "../../utils";

const Info = ({ game, handleSubmit, setActiveForm, activeForm, user }) => {
  return (
    <div className="flex-row flex-center">
      {activeForm === "gameEditForm" ? (
        <form onSubmit={handleSubmit} className="form">
          <Card className="card-page">
            <CardText>
              <div className="flex-row">
                <p className="row-label">Název:</p>
                <p>{game.name}</p>
              </div>
              <Field
                component={TextField}
                label="*Žánr"
                name="genre"
                validate={[Validation.required, Validation.isShorterEqual30]}
              />
              <div className="flex-row">
                <p className="row-label">Datum vydání:</p>
                <p>{formatDate(game.created)}</p>
              </div>
              <Field
                component={TextField}
                label="*Vydavatel"
                name="publisher"
                validate={[Validation.required, Validation.isShorterEqual30]}
              />
              <Field
                component={TextField}
                label="Módy"
                name="modes"
                componentClass="textarea"
                validate={[Validation.isShorterEqual100]}
              />
              <p>*Povinné</p>
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
              <p>{game.name}</p>
            </div>
            <div className="flex-row">
              <p className="row-label">Žánr:</p>
              <p>{game.genre}</p>
            </div>
            <div className="flex-row">
              <p className="row-label">Datum vydání:</p>
              <p>{formatDate(game.created)}</p>
            </div>
            <div className="flex-row">
              <p className="row-label">Vydavatel:</p>
              <p>{game.publisher}</p>
            </div>
            <div className="flex-row">
              <p className="row-label">Módy:</p>
              <p>{game.modes}</p>
            </div>
            {isAdmin(user.role) && (
              <div className="flex-row flex-center">
                <Button
                  bsStyle="primary"
                  onClick={() => setActiveForm("gameEditForm")}
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
    updateGame,
    getGames,
    getGame
  }),
  withHandlers({
    onSubmit: () => async (formData, dispatch, props) => {
      const { setActiveForm, updateGame, getGames, getGame, game } = props;
      const { genre, publisher, modes } = formData;

      if (
        await updateGame(
          game.name,
          genre,
          publisher,
          modes ? modes : "",
          game.created
        )
      ) {
        await getGames();
        getGame(game.name);
        setActiveForm(null);
      } else
        throw new SubmissionError({
          modes: "Hru se nepodařilo aktualizovat!"
        });
    }
  }),
  reduxForm({ form: "gameEditForm" })
)(Info);
