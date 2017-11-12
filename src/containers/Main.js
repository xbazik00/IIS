import React from "react";

import Header from "../components/Header";
import MainHeader from "../components/main/Header";
import Table from "../components/games/Table";

const Main = ({ history }) => {
  return (
    <div>
      <Header history={history} />
      <div className="container">
        <MainHeader />
        <Table history={history} />;
      </div>
    </div>
  );
};

export default Main;
