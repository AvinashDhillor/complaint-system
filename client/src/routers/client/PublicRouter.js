import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Route, Redirect } from 'react-router-dom';

export const PublicRouter = ({
  isAuthenticated,
  role,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={props =>
      isAuthenticated ? (
        <Redirect to="/d/panel" />
      ) : (
        <div>
          <Component {...props} />
        </div>
      )
    }
  />
);

const mapStateToProps = state => {
  return {
    isAuthenticated: state.client.isAuth,
    role: state.client.role
  };
};

export default connect(mapStateToProps)(PublicRouter);
