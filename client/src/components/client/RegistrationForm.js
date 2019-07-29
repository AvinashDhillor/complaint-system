import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearMessage } from '../../actions/departmentUserActions';
import ToastPanel from '../common/ToastPanel';
import { userRegister } from '../../actions/clientUserActions';

export class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      role: 'client',
      address: '',
      number: '',
      isLoading: false,
      isEnable: false,
      text: ''
    };
  }

  componentWillReceiveProps(nextProps) {
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

    this.props.userRegister(data, this.props.history);
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

        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card border-info mb-3">
                <div className="card-header bg-info text-white">
                  <i className="fas fa-user-plus mr-2" />
                  Create new account
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
                          class="spinner-grow spinner-grow-sm mr-1"
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
  isLoading: state.loadingStatus.loading,
  isMessage: !state.msg.isEmpty,
  msg: state.msg.text
});

export default connect(
  mapStateToProps,
  { userRegister, clearMessage }
)(RegistrationForm);
