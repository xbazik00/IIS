import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers, withState } from "recompose";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { FormGroup, ControlLabel } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { map, filter, find } from "lodash";

import DialogContainer from "./DialogContainer";

import { inviteUser } from "../../actions/teamActions";

import { isAdmin, isOrganizer } from "../../utils";

const InviteUserToTeam = ({
  handleSubmit,
  data,
  fail,
  value,
  setValue,
  users,
  activeTeam
}) => {
  const options =
    users && users.list && activeTeam
      ? map(
          filter(
            users.list,
            u =>
              !isAdmin(u.role) &&
              !isOrganizer(u.role) &&
              activeTeam.users[0].clan === u.clan &&
              !find(activeTeam.users, us => us.userName === u.userName)
          ),
          u => {
            return { label: u.userName, value: u.userName };
          }
        )
      : [];

  return (
    <DialogContainer
      title="Pozvat uživatele do týmu"
      name="InviteUserToTeam"
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
    ({ app: { dialog: { data }, user }, team: { activeTeam }, users }) => ({
      data,
      user,
      activeTeam,
      users
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
        users,
        activeTeam,
        setFail,
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
              !find(activeTeam.users, us => us.userName === u.userName)
          ),
          u => u.userName === value
        )
      )
        setFail("*Uživatel neexistuje nebo není možné ho vybrat");
      if (await inviteUser(data.name, value)) {
        setFail(null);
        dialog.closeDialog();
      } else setFail("*Pozvání se nezdařilo");
      setValue("");
    }
  }),
  reduxForm({
    form: "inviteUserToTeamDialogForm"
  })
)(InviteUserToTeam);
