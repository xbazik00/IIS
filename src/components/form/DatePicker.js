import React from "react";

import { FormGroup, ControlLabel } from "react-bootstrap";
import DatePicker from "react-bootstrap-date-picker";

const DatePickerComponent = ({ meta: { touched, error }, input, label }) => (
  <div>
    <FormGroup>
      {label && <ControlLabel>{label}</ControlLabel>}
      <DatePicker id="datepicker" {...input} />
    </FormGroup>
    {touched && error ? <span className="error-text">{error}</span> : <div />}
  </div>
);

export default DatePickerComponent;
