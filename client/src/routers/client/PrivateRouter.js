import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRouter = ({
  isAuthenticated,
  component: Component,
  user,
  ...rest
}) => (
  <Route
    {...rest}
    component={props =>
      isAuthenticated ? (
        <div>
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/error" />
      )
    }
  />
);

const mapStateToProps = state => {
  console.log(state.client.isAuth);

  return {
    isAuthenticated: state.client.isAuth
  };
};

export default connect(mapStateToProps)(PrivateRouter);
