import React, { Component } from 'react';
import LoginForm from '../common/LoginForm';
import { connect } from 'react-redux';
import _ from 'lodash';

import { clientLogin } from '../../actions/clientUserActions';

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  grabLoginData = data => {
    this.props.clientLogin(data);
  };

  render() {
    return (
      <>
        <div className="container my-5">
          <div className="row justify-content-center mb-4">
            <div className="col-lg-6 text-center text-info">
              <h1 className="display-4">
                {' '}
                <i className="fas fa-box-open mr-3" />
                Complaint Box
              </h1>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <LoginForm grabLoginData={this.grabLoginData} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.client);
  return { state };
};

export default connect(
  mapStateToProps,
  { clientLogin }
)(DashBoard);
