import React from "react";

import Header from "../components/Header";
import MainHeader from "../components/main/Header";

const Main = ({ history }) => {
  return (
    <div>
      <Header history={history} />
      <div className="container">
        <MainHeader />
      </div>
    </div>
  );
};

export default Main;
