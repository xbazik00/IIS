import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { compose, withHandlers } from "recompose";
import { Button } from "react-bootstrap";

import TextField from "../form/TextField";

import { setActiveForm, resetForm } from "../../actions/appActions";
import { updateUser, getUser } from "../../actions/usersActions";

const Form = ({ handleSubmit, setActiveForm, activeForm }) => {
  return activeForm === "passwordChangeForm" ? (
    <form onSubmit={handleSubmit} className="form">
      <Field
        component={TextField}
        label="Staré heslo"
        name="passwordOld"
        type="password"
      />
      <Field
        component={TextField}
        label="Nové heslo"
        name="password"
        type="password"
      />
      <Field
        component={TextField}
        label="Nové heslo znovu"
        name="password2"
        type="password"
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
  ) : (
    <Button
      className="button"
      bsStyle="primary"
      onClick={() => setActiveForm("passwordChangeForm")}
      block
    >
      Změnit heslo
    </Button>
  );
};

export default compose(
  connect(
    ({ app: { user } }) => ({
      user,
      initialValues: { passwordOld: "", password: "", password2: "" }
    }),
    {
      setActiveForm,
      updateUser,
      getUser,
      resetForm
    }
  ),
  withHandlers({
    onSubmit: () => async (formData, dispatch, props) => {
      const { setActiveForm, updateUser, getUser, user, resetForm } = props;
      const { passwordOld, password, password2 } = formData;

      if (
        ((!passwordOld || passwordOld === "") && user.password === "") ||
        passwordOld === user.password
      ) {
        if (password !== password2) {
          throw new SubmissionError({
            password2: "*Zadaná hesla nejsou totožná!"
          });
        }

        if (
          await updateUser({
            ...user,
            nick: user.userName,
            name: user.firstName,
            password: password ? password : ""
          })
        ) {
          getUser(user.userName);
          resetForm("passwordChangeForm");
          setActiveForm(null);
        } else
          throw new SubmissionError({
            password2: "*Heslo se nepodařilo změnit!"
          });
      } else {
        throw new SubmissionError({
          passwordOld: "*Špatné heslo!"
        });
      }
    }
  }),
  reduxForm({ form: "passwordChangeForm", enableReinitialize: true })
)(Form);
