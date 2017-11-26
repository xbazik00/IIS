import React from "react";
import { Card, CardText } from "react-md";
import { find } from "lodash";
import { connect } from "react-redux";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { compose, withHandlers } from "recompose";
import { Button } from "react-bootstrap";

import TextField from "../form/TextField";
import SelectField from "../form/SelectField";
import * as Validation from "../form/Validation";

import { setActiveForm } from "../../actions/appActions";
import { updateClan, getClan } from "../../actions/clanActions";

import { countries } from "../../enums";

const Info = ({
  clan,
  history,
  handleSubmit,
  activeForm,
  setActiveForm,
  user
}) => {
  return (
    <div className="flex-row flex-center">
      <Card className="card-page">
        {activeForm === "clanEditForm" ? (
          <CardText>
            <form onSubmit={handleSubmit} className="form">
              <div className="flex-row">
                <p className="row-label">Tag:</p>
                <p>{clan.tag}</p>
              </div>
              <Field
                component={TextField}
                label="Název klanu"
                name="name"
                validate={[Validation.required, Validation.isShorterEqual30]}
              />
              <div className="flex-row">
                <p className="row-label">Vůdce klanu:</p>
                <p>
                  <span
                    className="link"
                    onClick={() => history.push(`/user/${clan.boss}`)}
                  >
                    {clan.boss}
                  </span>
                </p>
              </div>
              <Field
                component={TextField}
                label="Logo"
                name="logo"
                validate={[Validation.required, Validation.isShorterEqual30]}
              />
              <Field
                component={TextField}
                label="Hymna"
                name="anthem"
                validate={[Validation.required, Validation.isShorterEqual30]}
              />
              <Field
                component={SelectField}
                label="Země působení"
                name="country"
                options={countries}
                validate={[Validation.required]}
              />
              <div className="flex-row flex-right">
                <Button className="button" onClick={() => setActiveForm(null)}>
                  Zrušit
                </Button>
                <Button className="button" type="submit" bsStyle="primary">
                  Změnit
                </Button>
              </div>
            </form>
          </CardText>
        ) : (
          <CardText>
            <div className="flex-row">
              <p className="row-label">Tag:</p>
              <p>{clan.tag}</p>
            </div>
            <div className="flex-row">
              <p className="row-label">Název:</p>
              <p>{clan.name}</p>
            </div>
            <div className="flex-row">
              <p className="row-label">Vůdce klanu:</p>
              <p>
                <span
                  className="link"
                  onClick={() => history.push(`/user/${clan.boss}`)}
                >
                  {clan.boss}
                </span>
              </p>
            </div>
            <div className="flex-row">
              <p className="row-label">Logo:</p>
              <p>{clan.logo}</p>
            </div>
            <div className="flex-row">
              <p className="row-label">Hymna:</p>
              <p>{clan.anthem}</p>
            </div>
            <div className="flex-row">
              <p className="row-label">Země působení:</p>
              <p>
                {find(countries, c => c.value === clan.country)
                  ? find(countries, c => c.value === clan.country).label
                  : clan.country}
              </p>
            </div>
            {user &&
              user.userName === clan.boss && (
                <div className="flex-row flex-center">
                  <Button
                    bsStyle="primary"
                    onClick={() => setActiveForm("clanEditForm")}
                    block
                  >
                    Upravit
                  </Button>
                </div>
              )}
          </CardText>
        )}
      </Card>
    </div>
  );
};

export default compose(
  connect(
    ({ app: { user, form: { activeForm } } }) => ({
      user,
      activeForm
    }),
    {
      setActiveForm,
      getClan,
      updateClan
    }
  ),
  withHandlers({
    onSubmit: () => async (formData, dispatch, props) => {
      const { setActiveForm, clan, getClan, updateClan } = props;
      const { name, logo, anthem, country } = formData;

      if (await updateClan(clan.tag, name, logo, anthem, country)) {
        getClan(clan.tag);
        setActiveForm(null);
      } else
        throw new SubmissionError({
          country: "*Klan se nepodařilo aktualizovat!"
        });
    }
  }),
  reduxForm({ form: "clanEditForm" })
)(Info);
