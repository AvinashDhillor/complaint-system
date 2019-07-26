import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class LoginForm extends Component {
  render() {
    return (
      <div className="card border-info mb-3">
        <div className="card-header bg-info text-white">
          <i class="fas fa-sign-in-alt mr-2" />
          Login into account
        </div>
        <div className="card-body">
          <form>
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
            <div class="btn-group">
              <button
                class="btn text-info"
                type="button"
                data-toggle="dropdown"
              >
                <i class="fas fa-user-plus mr-2" />
                Create Account
              </button>
              <div class="dropdown-menu">
                <Link to="/c/signup" className="dropdown-item">
                  <i class="fas fa-user mr-2" />
                  Normal user account
                </Link>

                <Link to="/d/signup" className="dropdown-item">
                  <i class="fas fa-user-tie mr-1" /> Department user account
                </Link>
              </div>
            </div>
            <button type="submit" class="btn btn-info float-right">
              <i class="fas fa-lock mr-2" />
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}
