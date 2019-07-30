import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = props => {
  return (
    <>
      <nav className="navbar navbar-dark bg-info header ">
        <Link to="/" className="navbar-brand">
          <i className="fas fa-box mr-2" />
          Complaint Box
        </Link>
        {props.isAuth ? (
          <>
            <span>
              <span className="text-white mr-2">Hi, {props.user.name}</span>
              <div className="btn-group dropleft">
                <button
                  className="btn btn-outline-light"
                  type="button"
                  data-toggle="dropdown"
                >
                  <i class="fas fa-cog" />
                </button>
                <div className="dropdown-menu">
                  <Link to="/change/password" className="dropdown-item">
                    <i class="fas fa-key mr-2" />
                    Change Password
                  </Link>
                </div>
              </div>
            </span>
          </>
        ) : (
          <button
            className="btn btn-outline-light my-2 my-sm-0"
            data-container="body"
            data-toggle="popover"
            data-placement="left"
            data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus vel augue laoreet rutrum faucibus  rutrum faucibus vel augue laoreet rutrum faucibus."
          >
            <i className="fas fa-question" />
          </button>
        )}
      </nav>
    </>
  );
};

const mapStateToProps = state => {
  return {
    isAuth: state.client.isAuth,
    user: state.client.user
  };
};

export default connect(mapStateToProps)(Header);
