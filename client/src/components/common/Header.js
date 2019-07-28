import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-dark bg-info header ">
        <Link to="/" className="navbar-brand">
          <i className="fas fa-box mr-2" />
          Complaint Box
        </Link>
        <button
          className="btn btn-outline-light my-2 my-sm-0"
          data-container="body"
          data-toggle="popover"
          data-placement="left"
          data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus vel augue laoreet rutrum faucibus  rutrum faucibus vel augue laoreet rutrum faucibus."
        >
          <i className="fas fa-question" />
        </button>
      </nav>
    </>
  );
};

export default Header;
