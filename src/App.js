import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import SignIn from "./containers/SignIn";
import Main from "./containers/Main";
import Profile from "./containers/Profile";

const App = ({ store }) => {
  return (
    <Provider store={store}>
      <Router>
        <div>
        <Route exact path="/" component={SignIn} />
          <Route exact path="/main" component={Main} />
          <Route exact path="/profile" component={Profile} />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
