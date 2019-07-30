import React, { Component } from 'react';
import { clearMessage } from '../../actions/departmentUserActions';
import { resetPassword } from '../../actions/clientUserActions';
import { connect } from 'react-redux';
import ToastPanel from '../common/ToastPanel';

class Reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      isEnable: false,
      text: ''
    };
  }

  componentWillReceiveProps(nextProps) {
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

  handleSubmit = e => {
    e.preventDefault();
    let data = {
      newPassword: this.state.newPassword,
      token: this.props.match.params.token
    };
    this.props.resetPassword(data, this.props.history);
  };

  handlePassword = e => {
    let data = e.target.value;
    this.setState({
      newPassword: data
    });
  };

  render() {
    return (
      <>
        <ToastPanel isEnable={this.state.isEnable} text={this.state.text} />

        <div className="d-flex justify-content-center ">
          <div className="col-lg-6">
            <div className="card my-5">
              <div className="card-header bg-info text-white">
                <i className="fas fa-unlock-alt mr-2" />
                New Password
              </div>
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="password">Enter New Password</label>
                    <input
                      onChange={this.handlePassword}
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                    />
                  </div>

                  <button type="submit" className="btn btn-info float-right">
                    <i className="fas fa-key mr-2" />
                    Confirm
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isMessage: !state.msg.isEmpty,
  msg: state.msg.text
});

export default connect(
  mapStateToProps,
  { clearMessage, resetPassword }
)(Reset);
