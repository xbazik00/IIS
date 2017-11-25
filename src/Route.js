import React from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";

const AppRoute = ({ exact, path, component }) => (
  <Route exact={!!exact} path={path} component={component} />
);

export default compose(
  withRouter,
  connect(({ app: { user } }) => ({ user }), null),
  lifecycle({
    componentWillMount() {
      const { user, history, path, location } = this.props;
      
      if (path !== "/" && (!user || !user.userName)) {
        history.replace("/");
      } else if (path === "/" && location.pathname === "/" && user) {
        history.replace("/main");
      }
    }
  })
)(AppRoute);
