import React from "react";

import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

const TextField = ({
  meta: { touched, error },
  input,
  placeholder,
  type,
  label
}) => (
  <div>
    <FormGroup controlId="formControlsTextField">
      {label && <ControlLabel>{label}</ControlLabel>}
      <FormControl {...input} type={type || "text"} placeholder={placeholder} />
    </FormGroup>
    {touched && error ? <span className="error-text">{error}</span> : <div />}
  </div>
);

export default TextField;
