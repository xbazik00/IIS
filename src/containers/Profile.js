import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import Header from "../components/Header";
import Info from "../components/profile/Info";
import Form from "../components/profile/Form";

import { setActiveForm } from "../actions/appActions";

const Profile = ({ history, activeForm, setActiveForm }) => {
  return (
    <div>
      <Header history={history} />
      <div className="container flex-center">
        {activeForm === "profileEditForm" ? (
          <Form initialValues={{ firstName: "Jméno", surname: "Příjmení" }} />
        ) : (
          <Info />
        )}
      </div>
    </div>
  );
};

export default compose(
  connect(({ app: { form: { activeForm } } }) => ({ activeForm }), {
    setActiveForm
  })
)(Profile);
