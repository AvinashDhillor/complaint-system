import React, { Component } from 'react';
import { clearMessage } from '../../actions/departmentUserActions';
import { changePassword } from '../../actions/clientUserActions';
import { connect } from 'react-redux';
import ToastPanel from '../common/ToastPanel';

export class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
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
    let { oldPassword, newPassword } = this.state;
    let data = {
      oldPassword,
      newPassword
    };
    this.props.changePassword(data);
  };

  handleOldPassword = e => {
    let data = e.target.value;
    this.setState({
      oldPassword: data
    });
  };

  handleNewPassword = e => {
    let data = e.target.value;
    this.setState({
      newPassword: data
    });
  };

  render() {
    return (
      <>
        <ToastPanel isEnable={this.state.isEnable} text={this.state.text} />

        <div style={{ marginLeft: '230px' }}>
          <div className="d-flex justify-content-center ">
            <div className="col-lg-9">
              <div className="card my-5">
                <div className="card-header bg-info text-white">
                  <i class="fas fa-unlock-alt mr-2" />
                  Change Password
                </div>
                <div className="card-body">
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="old-password">Enter old password</label>
                      <input
                        onChange={this.handleOldPassword}
                        type="password"
                        className="form-control"
                        id="old-password"
                        placeholder="Old password"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="new-password">Enter new password</label>
                      <input
                        onChange={this.handleNewPassword}
                        className="form-control"
                        id="new-password"
                        type="password"
                        placeholder="New password"
                      />
                    </div>

                    <button type="submit" className="btn btn-info float-right">
                      <i class="fas fa-key mr-2" />
                      Change Password
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

const mapStateToProps = state => ({
  isMessage: !state.msg.isEmpty,
  msg: state.msg.text
});

export default connect(
  mapStateToProps,
  { clearMessage, changePassword }
)(ChangePassword);
