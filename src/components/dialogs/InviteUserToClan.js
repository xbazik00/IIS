import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers, withState } from "recompose";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { FormGroup, ControlLabel } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { map, filter, find } from "lodash";

import DialogContainer from "./DialogContainer";

import { inviteUser } from "../../actions/clanActions";

import { isAdmin, isOrganizer } from "../../utils";

const InviteUserToClan = ({
  handleSubmit,
  data,
  fail,
  value,
  setValue,
  users,
  activeClan
}) => {
  const options =
    users && users.list && activeClan
      ? map(
          filter(
            users.list,
            u =>
              !isAdmin(u.role) &&
              !isOrganizer(u.role) &&
              !find(activeClan.users, us => us.userName === u.userName)
          ),
          u => {
            return { label: u.userName, value: u.userName };
          }
        )
      : [];

  return (
    <DialogContainer
      title="Pozvat uživatele do klanu"
      name="InviteUserToClan"
      handleSubmit={handleSubmit}
      submitLabel="Pozvat"
    >
      <FormGroup controlId="formControlsAutocomplete">
        <ControlLabel>Přezdívka</ControlLabel>
        <Typeahead
          labelKey="label"
          options={options}
          value={value}
          onChange={value =>
            value && value[0] && value[0].value && setValue(value[0].value)
          }
        />
      </FormGroup>
      {fail && <span className="error-text">{fail}</span>}
    </DialogContainer>
  );
};

export default compose(
  connect(
    ({ app: { dialog: { data }, user }, users, clan: { activeClan } }) => ({
      data,
      user,
      users,
      activeClan
    }),
    {
      inviteUser
    }
  ),
  withRouter,
  withState("fail", "setFail", null),
  withState("value", "setValue", ""),
  withHandlers({
    onSubmit: dialog => async (formData, dispatch, props) => {
      const {
        inviteUser,
        data,
        value,
        setFail,
        users,
        activeClan,
        setValue
      } = props;

      if (
        !value ||
        value === "" ||
        !find(
          filter(
            users.list,
            u =>
              !isAdmin(u.role) &&
              !isOrganizer(u.role) &&
              !find(activeClan.users, us => us.userName === u.userName)
          ),
          u => u.userName === value
        )
      )
        setFail("*Uživatel neexistuje nebo není možné ho vybrat");
      else if (await inviteUser(data.clanTag, value)) {
        setFail(null);
        dialog.closeDialog();
      } else setFail("*Pozvání se nezdařilo");
      setValue("");
    }
  }),
  reduxForm({
    form: "inviteUserToClanDialogForm"
  })
)(InviteUserToClan);
