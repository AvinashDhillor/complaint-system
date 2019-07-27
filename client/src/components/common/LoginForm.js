import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  onLogin = e => {
    e.preventDefault();
    this.props.grabLoginData(this.state);
  };

  onChangeEmail = e => {
    let data = e.target.value;
    this.setState({
      email: data
    });
  };

  onChangePassword = e => {
    let data = e.target.value;
    this.setState({
      password: data
    });
  };

  render() {
    return (
      <div className="card border-info mb-3">
        <div className="card-header bg-info text-white">
          <i className="fas fa-sign-in-alt mr-2" />
          Login into account
        </div>
        <div className="card-body">
          <form onSubmit={this.onLogin}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="ram@example.com"
                onChange={this.onChangeEmail}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                onChange={this.onChangePassword}
              />
            </div>
            <div className="btn-group">
              <button
                className="btn text-info"
                type="button"
                data-toggle="dropdown"
              >
                <i className="fas fa-user-plus mr-2" />
                Create Account
              </button>
              <div className="dropdown-menu">
                <Link to="/c/signup" className="dropdown-item">
                  <i className="fas fa-user mr-2" />
                  Normal user account
                </Link>

                <Link to="/d/signup" className="dropdown-item">
                  <i className="fas fa-user-tie mr-1" /> Department user account
                </Link>
              </div>
            </div>
            {this.props.setLoading ? (
              <button
                className="btn btn-info float-right"
                type="button"
                disabled
              >
                <span
                  className="spinner-border spinner-border-sm mr-1"
                  role="status"
                  aria-hidden="true"
                />
                Loading...
              </button>
            ) : (
              <button type="submit" className="btn btn-info float-right">
                <i className="fas fa-lock mr-2" />
                Login
              </button>
            )}
          </form>
        </div>
      </div>
    );
  }
}
