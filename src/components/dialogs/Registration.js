import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { withRouter } from "react-router-dom";

import TextField from "../form/TextField";
import SelectField from "../form/SelectField";
import * as Validation from "../form/Validation";
import DialogContainer from "./DialogContainer";

import { resetForm } from "../../actions/appActions";
import { createUser } from "../../actions/usersActions";

import { countries } from "../../enums";

const options = [
  { label: "Hráč", value: "PLAYER" },
  { label: "Trenér", value: "COACH" }
];

const Registration = ({ handleSubmit, data, created, setCreated }) => (
  <DialogContainer
    title="Registrace"
    name="Registration"
    handleSubmit={handleSubmit}
    submitLabel="Registrovat"
  >
    <Field
      component={TextField}
      label="Přezdívka"
      name="nick"
      validate={[Validation.required, Validation.isShorterEqual30]}
    />
    <Field
      component={TextField}
      label="Jméno"
      name="name"
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
      label="Role"
      name="role"
      options={options}
      validate={[Validation.required]}
    />
    <Field
      component={SelectField}
      label="Země původu"
      name="country"
      options={countries}
      validate={[Validation.required]}
    />
    <Field
      component={TextField}
      label="Heslo"
      name="password"
      type="password"
      validate={[Validation.isShorterEqual30]}
    />
    <Field
      component={TextField}
      label="Heslo znovu"
      name="password2"
      type="password"
      validate={[Validation.isShorterEqual30]}
    />
  </DialogContainer>
);

export default compose(
  connect(
    ({ app: { dialog: { data } } }) => ({
      data,
      initialValues: {
        nick: "",
        name: "",
        surname: "",
        role: "PLAYER",
        country: countries[0].value,
        password: "",
        password2: ""
      }
    }),
    { createUser, resetForm }
  ),
  withRouter,
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const { createUser, resetForm } = props;
      const {
        nick,
        name,
        surname,
        country,
        role,
        password,
        password2
      } = formData;

      if (
        ((!password || password === "") && (!password2 || password2 === "")) ||
        password === password2
      ) {
        if (await createUser(nick, name, surname, country, role, password)) {
          resetForm("registrationDialogForm");
          dialog.closeDialog();
        } else {
          throw new SubmissionError({
            nick: "*Uživatel s touto přezdívkou již existuje!"
          });
        }
      } else {
        throw new SubmissionError({
          password2: "*Zadaná hesla nejsou totožná!"
        });
      }
    }
  }),
  reduxForm({
    form: "registrationDialogForm",
    enableReinitialize: true
  })
)(Registration);
