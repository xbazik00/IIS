import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { compose, withHandlers } from "recompose";
import { Button } from "react-bootstrap";

import TextField from "../form/TextField";
import * as Validation from "../form/Validation";

import { signIn } from "../../actions/appActions";

const Form = ({ handleSubmit, setActiveForm }) => {
  return (
    <form onSubmit={handleSubmit} className="form">
      <Field
        component={TextField}
        label="Username"
        name="username"
        validate={[Validation.required]}
      />
      <Field
        component={TextField}
        label="Heslo"
        name="password"
        validate={[Validation.required]}
      />
      <div className="flex-row flex-center">
        <Button className="button" type="submit" bsStyle="primary">
          Přihlásit se
        </Button>
      </div>
    </form>
  );
};

export default compose(
  connect(null, { signIn }),
  withHandlers({
    onSubmit: () => async (formData, dispatch, props) => {
      const { username, password } = formData;
      const { signIn, history } = props;

      if (await signIn(username, password)) {
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
