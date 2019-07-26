import React, { Component } from 'react';
import LoginForm from '../common/LoginForm';

export class DashBoard extends Component {
  render() {
    return (
      <>
        <div className="container my-5">
          <div className="row justify-content-center mb-4">
            <div className="col-lg-6 text-center text-info">
              <h1 className="display-4">
                {' '}
                <i class="fas fa-box-open mr-3" />
                Complaint Box
              </h1>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <LoginForm />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default DashBoard;
