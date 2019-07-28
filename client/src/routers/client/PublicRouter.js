import React from 'react';
import { connect } from 'react-redux';
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
        role === 'department' ? (
          <Redirect to="/d/panel/allresolved" />
        ) : role === 'client' ? (
          <Redirect to="/c/panel/complaint" />
        ) : (
          <div>
            <Component {...props} />
          </div>
        )
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
