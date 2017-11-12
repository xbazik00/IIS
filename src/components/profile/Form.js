import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { compose, withHandlers } from "recompose";
import { Button } from "react-bootstrap";

import TextField from "../form/TextField";
import * as Validation from "../form/Validation";

import { setActiveForm } from "../../actions/appActions";

const Form = ({ handleSubmit, setActiveForm }) => {
  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="flex-row">
        <p className="row-label">Uživatelské jméno:</p>
        <p>Usename</p>
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
  connect(null, { setActiveForm }),
  withHandlers({
    onSubmit: () => async (formData, dispatch, props) => {
      const { setActiveForm } = props;

      setActiveForm(null);
    }
  }),
  reduxForm({ form: "profileEditForm" })
)(Form);
