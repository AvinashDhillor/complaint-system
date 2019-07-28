import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
                <Link
                  className="list-group-item bg-dark text-light list-group-item-action"
                  to="/c/panel/complaint"
                >
                  <i className="fas fa-envelope-open-text mr-2" />
                  New Complaint
                </Link>
                <Link
                  className="list-group-item list-group-item-action bg-dark text-info"
                  to="/c/panel/resolved"
                >
                  <i className="fas fa-check-double mr-2" />
                  Resolved
                  <span className="badge badge-light ml-3">
                    {this.props.resolved.length === 0
                      ? ''
                      : this.props.resolved.length}
                  </span>
                </Link>
                <Link
                  className="list-group-item list-group-item-action bg-dark text-info"
                  to="/c/panel/complaint/pending"
                >
                  <i className="fab fa-font-awesome-flag mr-2" />
                  Pending
                  <span className="badge badge-light ml-3">
                    {this.props.pending.length === 0
                      ? ''
                      : this.props.pending.length}
                  </span>
                </Link>
                <Link
                  className="list-group-item list-group-item-action bg-dark text-info"
                  to="/c/panel/complaint/rejected"
                >
                  <i className="fas fa-ban mr-2" />
                  Rejected
                  <span className="badge badge-light ml-3">
                    {this.props.rejected.length === 0
                      ? ''
                      : this.props.rejected.length}
                  </span>
                </Link>
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
                <Link
                  className="list-group-item bg-dark text-info list-group-item-action"
                  to="allresolved"
                >
                  <i className="fas fa-envelope-open-text mr-2" />
                  All Resolved
                  <span className="badge badge-light ml-3">
                    {this.props.allresolved.length === 0
                      ? ''
                      : this.props.allresolved.length}
                  </span>
                </Link>
                <Link
                  className="list-group-item list-group-item-action bg-dark text-info"
                  to="/d/panel/resolved"
                >
                  <i className="fas fa-check-double mr-2" />
                  Resolved
                  <span className="badge badge-light ml-3">
                    {this.props.resolved.length === 0
                      ? ''
                      : this.props.resolved.length}
                  </span>
                </Link>
                <Link
                  className="list-group-item list-group-item-action bg-dark text-info"
                  to="/d/panel/pending"
                >
                  <i className="fab fa-font-awesome-flag mr-2" />
                  Pending
                  <span className="badge badge-light ml-3">
                    {this.props.pending.length === 0
                      ? ''
                      : this.props.pending.length}
                  </span>
                </Link>
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
                <Link
                  className="list-group-item bg-dark text-info list-group-item-action"
                  to="/a/panel/departments"
                >
                  <i class="fas fa-university mr-2" />
                  Departments
                  <span className="badge badge-light ml-3">
                    {this.props.allresolved.length === 0
                      ? ''
                      : this.props.allresolved.length}
                  </span>
                </Link>
                <Link
                  className="list-group-item list-group-item-action bg-dark text-info"
                  to="/a/panel/members"
                >
                  <i class="fas fa-users mr-2" />
                  Memebers
                  <span className="badge badge-light ml-3">
                    {this.props.ud.length === 0 ? '' : this.props.ud.length}
                  </span>
                </Link>
                <br />
              </div>
              <div className="list-group ">
                <Link
                  className="list-group-item bg-dark text-info list-group-item-action"
                  to="/a/panel/users"
                >
                  <i class="fas fa-user mr-2" />
                  Users
                  <span className="badge badge-light ml-3">
                    {this.props.uc.length === 0 ? '' : this.props.uc.length}
                  </span>
                </Link>
                <Link
                  className="list-group-item list-group-item-action bg-dark text-info"
                  to="/a/panel/complaints"
                >
                  <i class="fas fa-archive mr-2" />
                  Complaints
                  <span className="badge badge-light ml-3">
                    {this.props.pending.length === 0
                      ? ''
                      : this.props.pending.length}
                  </span>
                </Link>
              </div>
              <br />
              <div className="list-group ">
                <Link
                  className="list-group-item bg-dark text-info list-group-item-action"
                  to="/a/panel/show/admins"
                >
                  <i class="fas fa-award mr-2" />
                  Show Admins
                  <span className="badge badge-light ml-3">
                    {this.props.allresolved.length === 0
                      ? ''
                      : this.props.allresolved.length}
                  </span>
                </Link>
                <Link
                  className="list-group-item bg-dark text-info list-group-item-action"
                  to="/a/panel/register"
                >
                  <i class="fas fa-user-shield mr-2" />
                  New Admin
                </Link>
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
