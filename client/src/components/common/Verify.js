import React, { Component } from 'react';
import { clearMessage } from '../../actions/departmentUserActions';
import { verifyEmail } from '../../actions/clientUserActions';
import { connect } from 'react-redux';

export class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnable: false,
      text: ''
    };
  }

  componentDidMount() {
    let { token } = this.props.match.params;
    this.props.verifyEmail(token, this.props.history);
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

  render() {
    return (
      <>
        <div className="d-flex justify-content-center ">
          <h1 className="display-4">{this.state.text}</h1>
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
  { clearMessage, verifyEmail }
)(ForgetPassword);
