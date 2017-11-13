import React from "react";
import { Card, CardText } from "react-md";

import Header from "../components/Header";
import Form from "../components/signIn/Form";

const SignIn = ({ history }) => {
  return (
    <div>
      <Header authStyle history={history} />
      <div className="container flex-center center">
        <Card className="card-page">
          <CardText>
            <Form history={history} />
          </CardText>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
