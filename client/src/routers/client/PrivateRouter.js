import React from 'react';
import { connect } from 'react-redux';
import Panel from '../../components/common/Panel';
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
          <Panel />
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const mapStateToProps = state => {
  return {
    isAuthenticated: state.client.isAuth
  };
};

export default connect(mapStateToProps)(PrivateRouter);
