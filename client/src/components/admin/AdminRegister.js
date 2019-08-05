import React, { Component } from 'react';
import { connect } from 'react-redux';

import { registerAdmin } from '../../actions/adminActions';
import { clearMessage } from '../../actions/departmentUserActions';
import ToastPanel from '../common/ToastPanel';

export class AdminRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      role: 'admin',
      address: '',
      number: '',
      isLoading: false,
      isEnable: false,
      text: ''
    };
  }

  componentDidMount() {
    if (this.props.isAuth) {
      if (this.props.role === 'department')
        this.props.history.push('/d/panel/allresolved');
      else if (this.props.role === 'client') {
        this.props.history.push('/c/panel/complaint/create');
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuth) {
      if (nextProps.role === 'department')
        this.props.history.push('/d/panel/allresolved');
      else if (this.props.role === 'client') {
        this.props.history.push('/c/panel/complaint/create');
      }
    }

    this.setState({
      isLoading: nextProps.isLoading
    });

    if (nextProps.isMessage && !this.state.isEnable) {
      this.setState({
        isEnable: true,
        text: nextProps.msg
      });

      setTimeout(() => {
        this.props.clearMessage();
        this.setState({
          isEnable: false,
          text: ''
        });
      }, 3000);
    }
  }

  register = e => {
    e.preventDefault();
    let data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role,
      address: this.state.address,
      contactNumber: this.state.number
    };

    this.props.registerAdmin(data, this.props.history);
  };

  onNameChange = e => {
    let data = e.target.value;
    this.setState({
      name: data
    });
  };
  onEmailChange = e => {
    let data = e.target.value;
    this.setState({
      email: data
    });
  };
  onPasswordChange = e => {
    let data = e.target.value;
    this.setState({
      password: data
    });
  };
  onAddressChange = e => {
    let data = e.target.value;
    this.setState({
      address: data
    });
  };
  onNumberChange = e => {
    let data = e.target.value;
    this.setState({
      number: data
    });
  };

  render() {
    return (
      <>
        <ToastPanel isEnable={this.state.isEnable} text={this.state.text} />

        <div style={{ marginLeft: '230px' }}>
          <div className="d-flex justify-content-center">
            <div className="col-6 my-4">
              <div className="card border-info mb-3">
                <div className="card-header bg-info text-white">
                  <i className="fas fa-user-shield mr-2" />
                  Create new admin
                </div>
                <div className="card-body">
                  <form onSubmit={this.register}>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        onChange={this.onNameChange}
                        name="name"
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Ram kumar"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        onChange={this.onEmailChange}
                        name="email"
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="ram@example.com"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        onChange={this.onPasswordChange}
                        name="password"
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirm-password">Confirm Password</label>
                      <input
                        name="c-password"
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
                          onChange={this.onNumberChange}
                          name="number"
                          type="text"
                          className="form-control"
                          id="number"
                          placeholder=""
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="address">Address</label>
                      <input
                        onChange={this.onAddressChange}
                        name="address"
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="1234 Main st, Apartment, studio, or floor"
                      />
                    </div>

                    {this.state.isLoading ? (
                      <button
                        className="btn btn-info float-right"
                        type="button"
                        disabled
                      >
                        <span
                          className="spinner-grow spinner-grow-sm mr-1"
                          role="status"
                          aria-hidden="true"
                        />
                        Creating...
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-info float-right"
                      >
                        <i className="fas fa-arrow-alt-circle-right mr-2" />
                        Register
                      </button>
                    )}
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

const mapStateToProps = state => ({
  isAuth: state.client.isAuth,
  role: state.client.user.role,
  isLoading: state.loadingStatus.loading,
  isMessage: !state.msg.isEmpty,
  msg: state.msg.text
});

export default connect(
  mapStateToProps,
  { registerAdmin, clearMessage }
)(AdminRegister);
