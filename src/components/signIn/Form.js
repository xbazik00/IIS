import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { compose, withHandlers } from "recompose";
import { Button } from "react-bootstrap";

import TextField from "../form/TextField";
import * as Validation from "../form/Validation";

import { signIn, setDialog } from "../../actions/appActions";

const Form = ({ handleSubmit, setActiveForm, setDialog }) => {
  return (
    <form onSubmit={handleSubmit} className="form">
      <Field
        component={TextField}
        label="Uživatelské jméno"
        name="userName"
        validate={[Validation.required]}
      />
      <Field
        component={TextField}
        label="Heslo"
        name="password"
        type="password"
      />
      <div className="flex-row flex-center">
        <Button className="button" onClick={() => setDialog("Registration")}>
          Registrovat se
        </Button>
        <Button className="button" type="submit" bsStyle="primary">
          Přihlásit se
        </Button>
      </div>
    </form>
  );
};

export default compose(
  connect(null, { signIn, setDialog }),
  withHandlers({
    onSubmit: () => async (formData, dispatch, props) => {
      const { userName, password } = formData;
      const { signIn, history } = props;

      if (await signIn(userName, password ? password : "")) {
        history.push("/main");
      } else {
        throw new SubmissionError({
          password: "*Zadané jméno nebo heslo není správné!"
        });
      }
    }
  }),
  reduxForm({ form: "signInForm" })
)(Form);
