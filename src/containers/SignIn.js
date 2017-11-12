import React from "react";

import Header from "../components/Header";
import Form from "../components/signIn/Form";

const SignIn = ({ history }) => {
  return (
    <div>
      <Header authStyle history={history} />
      <div className="container">
        <div className="flex-row flex-center">
          <Form history={history} />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
