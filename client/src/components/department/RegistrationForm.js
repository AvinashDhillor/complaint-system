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
                  <i class="fas fa-user-plus mr-2" />
                  Create new account
                </div>
                <div className="card-body">
                  <form>
                    <div class="form-group">
                      <label for="name">Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="name"
                        placeholder="Ram kumar"
                      />
                    </div>
                    <div class="form-group">
                      <label for="email">Email</label>
                      <input
                        type="text"
                        class="form-control"
                        id="email"
                        placeholder="ram@example.com"
                      />
                    </div>
                    <div class="form-group">
                      <label for="password">Password</label>
                      <input
                        type="password"
                        class="form-control"
                        id="password"
                        placeholder="Password"
                      />
                    </div>
                    <div class="form-group">
                      <label for="confirm-password">Confirm Password</label>
                      <input
                        type="password"
                        class="form-control"
                        id="confirm-password"
                        placeholder="Confirm Password"
                      />
                    </div>

                    <div class="form-group">
                      <label for="number">Contact Number</label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <div class="input-group-text">+91</div>
                        </div>

                        <input
                          type="text"
                          class="form-control"
                          id="number"
                          placeholder=""
                        />
                      </div>
                    </div>

                    <div class="form-group">
                      <label for="inputAddress2">Address</label>
                      <input
                        type="text"
                        class="form-control"
                        id="inputAddress2"
                        placeholder="1234 Main st, Apartment, studio, or floor"
                      />
                    </div>

                    <button type="submit" class="btn btn-info float-right">
                      <i class="fas fa-arrow-alt-circle-right mr-2" />
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
