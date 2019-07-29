import React, { Component } from 'react';
import LoginForm from '../common/LoginForm';
import { connect } from 'react-redux';
import BlinkSpinner from '../common/BlinkSpinner';
import { clientLogin } from '../../actions/clientUserActions';

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  componentDidMount() {
    if (this.props.isAuth) {
      if (this.props.role === 'department')
        this.props.history.push('/d/panel/allresolved');
      else if (this.props.role === 'client') {
        this.props.history.push('/c/panel/complaint/create');
      } else if (this.props.role === 'admin') {
        this.props.history.push('/a/panel/departments');
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuth) {
      if (nextProps.role === 'department')
        this.props.history.push('/d/panel/allresolved');
      else if (this.props.role === 'client') {
        this.props.history.push('/c/panel/complaint/create');
      } else if (this.props.role === 'admin') {
        this.props.history.push('/a/panel/departments');
      }
    }
  }

  grabLoginData = data => {
    this.props.clientLogin(data);
  };

  render() {
    return (
      <>
        {this.props.isAuth && this.props.isLoading && <BlinkSpinner />}
        {!this.props.isAuth && (
          <div className="container my-5">
            <div className="row justify-content-center mb-4">
              <div className="col-lg-6 text-center text-info">
                <h1 className="display-4">
                  {' '}
                  <i className="fas fa-box-open mr-3" />
                  Complaint Box
                </h1>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <LoginForm
                  grabLoginData={this.grabLoginData}
                  setLoading={this.props.isLoading}
                />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.client.isAuth,
    role: state.client.user.role,
    isLoading: state.loadingStatus.loading
  };
};

export default connect(
  mapStateToProps,
  { clientLogin }
)(DashBoard);
