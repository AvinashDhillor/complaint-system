import React, { Component } from 'react';

export class RegistrationForm extends Component {
  render() {
    return (
      <>
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card border-info mb-3">
                <div className="card-header bg-info text-white">
                  <i className="fas fa-user-plus mr-2" />
                  Create new account
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Ram kumar"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="ram@example.com"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirm-password">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirm-password"
                        placeholder="Confirm Password"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="number">Contact Number</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <div className="input-group-text">+91</div>
                        </div>

                        <input
                          type="text"
                          className="form-control"
                          id="number"
                          placeholder=""
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="inputAddress2">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputAddress2"
                        placeholder="1234 Main st, Apartment, studio, or floor"
                      />
                    </div>

                    <button type="submit" className="btn btn-info float-right">
                      <i className="fas fa-arrow-alt-circle-right mr-2" />
                      Register
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default RegistrationForm;
