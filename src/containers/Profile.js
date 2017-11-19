import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Card, CardText } from "react-md";

import Header from "../components/Header";
import Info from "../components/profile/Info";
import Form from "../components/profile/Form";

import { setActiveForm } from "../actions/appActions";

const Profile = ({ history, activeForm, setActiveForm, user }) => {
  return (
    <div>
      <Header history={history} />
      {user && (
        <div className="container">
          <div className="flex-row flex-center">
            <Card className="card-page">
              <CardText>
                {activeForm === "profileEditForm" ? (
                  <Form initialValues={{ ...user }} user={user} />
                ) : (
                  <Info user={user} />
                )}
              </CardText>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default compose(
  connect(({ app: { form: { activeForm }, user } }) => ({ activeForm, user }), {
    setActiveForm
  })
)(Profile);
