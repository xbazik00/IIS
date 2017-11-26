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

import { isCoach, isPlayer } from "../../utils";

import { countries } from "../../enums";

const Form = ({ handleSubmit, setActiveForm, user }) => {
  const coach = isCoach(user.role);
  const player = isPlayer(user.role);
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
        validate={[Validation.required, Validation.isShorterEqual30]}
      />
      <Field
        component={TextField}
        label="Příjmení"
        name="surname"
        validate={[Validation.required, Validation.isShorterEqual30]}
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
          validate={[Validation.isShorterEqual1000]}
        />
      )}
      {player && (
        <Field
          component={TextField}
          label="Myš"
          name="mouse"
          validate={[Validation.isShorterEqual30]}
        />
      )}
      {player && (
        <Field
          component={TextField}
          label="Klávesnice"
          name="keyboard"
          validate={[Validation.isShorterEqual30]}
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
      const { firstName, surname, country, notes, mouse, keyboard } = formData;

      if (
        await updateUser({
          ...user,
          nick: user.userName,
          name: firstName,
          surname,
          country,
          notes,
          mouse,
          keyboard
        })
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
