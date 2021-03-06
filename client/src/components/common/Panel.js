import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  loadPending,
  loadRejected,
  loadResolved,
  clientLogout
} from '../../actions/clientUserActions';
import {
  dloadResolved,
  dallloadResolved,
  getDepartments
} from '../../actions/departmentUserActions';
import {
  udUser,
  vdUser,
  ucUser,
  vcUser,
  loadadmin,
  loadComplaints
} from '../../actions/adminActions';
import SmallBlinkSpinner from './SmallBlinkSpinner';
import './css/main.css';

export class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: ''
    };
  }

  componentWillMount() {
    if (this.props.isAuth) {
      if (this.props.role === 'department') {
        this.props.dallloadResolved();
        this.props.dloadResolved();
        this.props.loadPending();
      }

      if (this.props.role === 'client') {
        this.props.loadPending();
        this.props.loadRejected();
        this.props.loadResolved();
        this.props.getDepartments();
      }

      if (this.props.role === 'admin') {
        this.props.udUser();
        this.props.vdUser();
        this.props.ucUser();
        this.props.vcUser();
        this.props.loadadmin();
        this.props.loadComplaints();
        this.props.getDepartments();
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuth) {
      this.setState({
        role: nextProps.role
      });
    }
  }

  performLogout = () => {
    this.props.clientLogout();
  };

  render() {
    return (
      <>
        <div className="sidePanel bg-dark d-flex flex-column px-3">
          {this.props.role === 'client' ? (
            <>
              <div className="list-group ">
                <NavLink
                  className="list-group-item bg-dark text-light list-group-item-action"
                  to="/c/panel/complaint/create"
                  activeClassName="active"
                >
                  <i className="fas fa-envelope-open-text mr-2" />
                  New Complaint
                </NavLink>
                <NavLink
                  className="list-group-item list-group-item-action bg-dark text-info"
                  to="/c/panel/resolved"
                >
                  <i className="fas fa-check-double mr-2" />
                  Resolved
                  {this.props.isLoading && <SmallBlinkSpinner />}
                  {!this.props.isLoading && (
                    <span className="badge badge-light ml-3">
                      {this.props.resolved.length === 0
                        ? ''
                        : this.props.resolved.length}
                    </span>
                  )}
                </NavLink>
                <NavLink
                  className="list-group-item list-group-item-action bg-dark text-info"
                  to="/c/panel/complaint/pending"
                >
                  <i className="fab fa-font-awesome-flag mr-2" />
                  Pending
                  {this.props.isLoading && <SmallBlinkSpinner />}
                  {!this.props.isLoading && (
                    <span className="badge badge-light ml-3">
                      {this.props.pending.length === 0
                        ? ''
                        : this.props.pending.length}
                    </span>
                  )}
                </NavLink>
                <NavLink
                  className="list-group-item list-group-item-action bg-dark text-info"
                  to="/c/panel/complaint/rejected"
                >
                  <i className="fas fa-ban mr-2" />
                  Rejected
                  {this.props.isLoading && <SmallBlinkSpinner />}
                  {!this.props.isLoading && (
                    <span className="badge badge-light ml-3">
                      {this.props.rejected.length === 0
                        ? ''
                        : this.props.rejected.length}
                    </span>
                  )}
                </NavLink>
              </div>
              <br />
              <br />
              <button
                type="button"
                className="btn btn-danger btn-lg"
                onClick={this.performLogout}
              >
                <i className="fas fa-sign-out-alt" /> Logout
              </button>{' '}
            </>
          ) : this.props.role === 'department' ? (
            <>
              <div className="list-group ">
                <NavLink
                  className="list-group-item bg-dark text-info list-group-item-action"
                  to="allresolved"
                  activeClassName="active"
                >
                  <i className="fas fa-envelope-open-text mr-2" />
                  All Resolved
                  {this.props.isLoading && <SmallBlinkSpinner />}
                  {!this.props.isLoading && (
                    <span className="badge badge-light ml-3">
                      {this.props.allresolved.length === 0
                        ? ''
                        : this.props.allresolved.length}
                    </span>
                  )}
                </NavLink>
                <NavLink
                  className="list-group-item list-group-item-action bg-dark text-info"
                  to="/d/panel/resolved"
                >
                  <i className="fas fa-check-double mr-2" />
                  Resolved
                  {this.props.isLoading && <SmallBlinkSpinner />}
                  {!this.props.isLoading && (
                    <span className="badge badge-light ml-3">
                      {this.props.resolved.length === 0
                        ? ''
                        : this.props.resolved.length}
                    </span>
                  )}
                </NavLink>
                <NavLink
                  className="list-group-item list-group-item-action bg-dark text-info"
                  to="/d/panel/pending"
                >
                  <i className="fab fa-font-awesome-flag mr-2" />
                  Pending
                  {this.props.isLoading && <SmallBlinkSpinner />}
                  {!this.props.isLoading && (
                    <span className="badge badge-light ml-3">
                      {this.props.pending.length === 0
                        ? ''
                        : this.props.pending.length}
                    </span>
                  )}
                </NavLink>
              </div>
              <br />
              <br />
              <button
                type="button"
                className="btn btn-danger btn-lg"
                onClick={this.performLogout}
              >
                <i className="fas fa-sign-out-alt" /> Logout
              </button>{' '}
            </>
          ) : this.props.role === 'admin' ? (
            <>
              <div className="list-group ">
                <NavLink
                  className="list-group-item bg-dark text-info list-group-item-action"
                  to="/a/panel/departments"
                  activeClassName="active"
                >
                  <i className="fas fa-university mr-2" />
                  Departments
                </NavLink>
                <NavLink
                  className="list-group-item list-group-item-action bg-dark text-info"
                  to="/a/panel/members"
                >
                  <i className="fas fa-users mr-2" />
                  Memebers
                  {this.props.isLoading && <SmallBlinkSpinner />}
                  {!this.props.isLoading && (
                    <span className="badge badge-light ml-3">
                      {this.props.ud.length === 0 ? '' : this.props.ud.length}
                    </span>
                  )}
                </NavLink>
                <br />
              </div>
              <div className="list-group ">
                <NavLink
                  className="list-group-item bg-dark text-info list-group-item-action"
                  to="/a/panel/users"
                >
                  <i className="fas fa-user mr-2" />
                  Users
                  {this.props.isLoading && <SmallBlinkSpinner />}
                  {!this.props.isLoading && (
                    <span className="badge badge-light ml-3">
                      {this.props.uc.length === 0 ? '' : this.props.uc.length}
                    </span>
                  )}
                </NavLink>
                <NavLink
                  className="list-group-item list-group-item-action bg-dark text-info"
                  to="/a/panel/complaints"
                >
                  <i className="fas fa-archive mr-2" />
                  Complaints
                  {this.props.isLoading && <SmallBlinkSpinner />}
                  {!this.props.isLoading && (
                    <span className="badge badge-light ml-3">
                      {this.props.pending.length === 0
                        ? ''
                        : this.props.pending.length}
                    </span>
                  )}
                </NavLink>
              </div>
              <br />
              <div className="list-group ">
                <NavLink
                  className="list-group-item bg-dark text-info list-group-item-action"
                  to="/a/panel/show/admins"
                >
                  <i className="fas fa-award mr-2" />
                  Show Admins
                </NavLink>
                <NavLink
                  className="list-group-item bg-dark text-info list-group-item-action"
                  to="/a/panel/register"
                >
                  <i className="fas fa-user-shield mr-2" />
                  New Admin
                </NavLink>
              </div>
              <br />
              <button
                type="button"
                className="btn btn-danger btn-lg"
                onClick={this.performLogout}
              >
                <i className="fas fa-sign-out-alt" /> Logout
              </button>{' '}
            </>
          ) : (
            <p>You are not Authenticated</p>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    role: state.client.user.role,
    isLoading: state.loadingStatus.loading,
    isAuth: state.client.isAuth,
    pending: state.pending,
    resolved: state.resolved,
    allresolved: state.allresolved,
    rejected: state.rejected,
    ud: state.ud,
    vc: state.vc,
    uc: state.uc,
    vd: state.vd,
    ad: state.ad
  };
};

export default connect(
  mapStateToProps,
  {
    loadPending,
    loadRejected,
    loadResolved,
    clientLogout,
    dloadResolved,
    dallloadResolved,
    udUser,
    vdUser,
    ucUser,
    vcUser,
    loadadmin,
    loadComplaints,
    getDepartments
  }
)(Panel);
