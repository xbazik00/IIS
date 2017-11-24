import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { compose, withHandlers } from "recompose";
import { Button } from "react-bootstrap";

import TextField from "../form/TextField";
import SelectField from "../form/SelectField";
import * as Validation from "../form/Validation";

import { setActiveForm } from "../../actions/appActions";
import { updateUser, getUser } from "../../actions/usersActions";

import { isCoach } from "../../utils";

import { countries } from "../../enums";

const Form = ({ handleSubmit, setActiveForm, user }) => {
  const coach = isCoach(user.role);
  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="flex-row">
        <p className="row-label">Uživatelské jméno:</p>
        <p>{user.userName}</p>
      </div>
      <Field
        component={TextField}
        label="Jméno"
        name="firstName"
        validate={[Validation.required]}
      />
      <Field
        component={TextField}
        label="Příjmení"
        name="surname"
        validate={[Validation.required]}
      />
      <Field
        component={SelectField}
        label="Země původu"
        name="country"
        options={countries}
        validate={[Validation.required]}
      />
      {coach && (
        <Field
          component={TextField}
          label="Poznámky"
          name="notes"
          componentClass="textarea"
        />
      )}
      <div className="flex-row flex-right">
        <Button className="button" onClick={() => setActiveForm(null)}>
          Zrušit
        </Button>
        <Button className="button" type="submit" bsStyle="primary">
          Změnit
        </Button>
      </div>
    </form>
  );
};

export default compose(
  connect(({ app: { user } }) => ({ user }), {
    setActiveForm,
    updateUser,
    getUser
  }),
  withHandlers({
    onSubmit: () => async (formData, dispatch, props) => {
      const { setActiveForm, updateUser, getUser, user } = props;
      const { userName, firstName, surname, country } = formData;

      if (
        await updateUser(userName, firstName, surname, country, user.password)
      ) {
        getUser(user.userName);
        setActiveForm(null);
      } else
        throw new SubmissionError({
          notes: "*Profil se nepodařilo aktualizovat!"
        });
    }
  }),
  reduxForm({ form: "profileEditForm" })
)(Form);
