import React from "react";
import { FormGroup, ControlLabel } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

const AutocompleteField = props => {
  const { meta: { touched, error }, input, label, data } = props;
  return (
    <div>
      <FormGroup controlId="formControlsAutocomplete">
        {label && <ControlLabel>{label}</ControlLabel>}
        <Typeahead {...input} labelKey="name" options={data} />
      </FormGroup>
      {touched && error ? <span className="error-text">{error}</span> : <div />}
    </div>
  );
};

export default AutocompleteField;
