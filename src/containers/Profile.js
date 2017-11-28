import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Card, CardText } from "react-md";
import { Button } from "react-bootstrap";

import Header from "../components/Header";
import Info from "../components/profile/Info";
import Form from "../components/profile/Form";
import PasswordForm from "../components/profile/PasswordForm";

import { setActiveForm, setDialog } from "../actions/appActions";

import { isAdmin } from "../utils";

const Profile = ({ history, activeForm, setActiveForm, user, setDialog }) => {
  return (
    <div>
      <Header history={history} />
      {user && (
        <div className="container">
          <div className="flex-row flex-center">
            <Card className="card-page">
              <CardText>
                <div className="margin-bottom-small">
                  {activeForm === "profileEditForm" ? (
                    <Form initialValues={{ ...user }} user={user} />
                  ) : (
                    <Info user={user} />
                  )}
                </div>
                <div className="flex-row flex-center margin-bottom-small">
                  <PasswordForm activeForm={activeForm} />
                </div>
                {!isAdmin(user.role) && (
                  <div className="flex-row flex-center">
                    <Button
                      onClick={() =>
                        setDialog("DeleteUser", {
                          userName: user.userName,
                          deleteMe: true
                        })
                      }
                      block
                    >
                      Zrušit účet
                    </Button>
                  </div>
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
    setActiveForm,
    setDialog
  })
)(Profile);
