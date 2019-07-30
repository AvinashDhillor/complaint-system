import React, { Component } from 'react';
import { clearMessage } from '../../actions/departmentUserActions';
import { forgetPassword } from '../../actions/clientUserActions';
import { connect } from 'react-redux';
import ToastPanel from '../common/ToastPanel';

export class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
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
    let { email } = this.state;
    let data = {
      email
    };
    this.props.forgetPassword(data, this.props.history);
  };

  handleEmail = e => {
    let data = e.target.value;
    this.setState({
      email: data
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
                Forget Password
              </div>
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Enter email address</label>
                    <input
                      onChange={this.handleEmail}
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="ram@gmail.com"
                    />
                  </div>

                  <button type="submit" className="btn btn-info float-right">
                    <i className="fas fa-key mr-2" />
                    Send password
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
  { clearMessage, forgetPassword }
)(ForgetPassword);
