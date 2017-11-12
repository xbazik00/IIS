import React from "react";

import Header from "../components/Header";

const Main = ({ history }) => {
  return (
    <div>
      <Header history={history} />
      <div className="container">HOMEPAGE</div>
    </div>
  );
};

export default Main;
