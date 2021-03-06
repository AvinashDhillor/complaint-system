import React, { Component } from 'react';
import { connect } from 'react-redux';

import { verifyUser, deleteUser } from '../../actions/adminActions';
import BlinkSpinner from '../common/BlinkSpinner';

class Members extends Component {
  handleSubmit1 = e => {
    e.preventDefault();
    let data = {
      _id: e.target._id.value
    };

    this.props.verifyUser(data);
  };
  handleSubmit2 = e => {
    e.preventDefault();
    let data = {
      _id: e.target._id.value
    };
    this.props.deleteUser(data);
  };

  render() {
    return (
      <div style={{ marginLeft: '230px' }}>
        <div className="d-flex justify-content-center">
          <div className="col-11 mt-4">
            <h3 className="text-left text-black-50 display-4">
              Members Request
            </h3>
            {this.props.isLoading && <BlinkSpinner />}
            {!this.props.isLoading && (
              <>
                <table className="table table-striped mt-4">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">S.No.</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone No.</th>
                      <th scope="col">Department</th>
                      <th scope="col">Address</th>
                      <th scope="col">Approve</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.ud.map((data, i) => {
                      return (
                        <tr key={i}>
                          <th scope="row">{i + 1}</th>
                          <td>{data.name}</td>
                          <td>{data.email}</td>
                          <td>{data.contactNumber}</td>
                          <td>{data.departmentId.name}</td>
                          <td>{data.address}</td>
                          <td>
                            <form onSubmit={this.handleSubmit1}>
                              <input
                                type="hidden"
                                value={data._id}
                                name="_id"
                              />
                              <button
                                type="submit"
                                className="btn btn-success btn-sm"
                              >
                                <i className="fas fa-user-check" />
                              </button>
                            </form>
                          </td>
                          <td>
                            <form onSubmit={this.handleSubmit2}>
                              <input
                                type="hidden"
                                value={data._id}
                                name="_id"
                              />
                              <button
                                type="submit"
                                className="btn btn-danger btn-sm"
                              >
                                <i className="fas fa-trash-alt" />
                              </button>
                            </form>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="col-11 mt-4">
            <h3 className="text-info text-black-50 display-4">
              Approved Members
            </h3>
            {this.props.isLoading && <BlinkSpinner />}
            {!this.props.isLoading && (
              <>
                <table className="table table-striped mt-4">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">S.No.</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone No.</th>
                      <th scope="col">Department</th>
                      <th scope="col">Address</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.vd.map((data, i) => {
                      return (
                        <tr key={i}>
                          <th scope="row">{i + 1}</th>
                          <td>{data.name}</td>
                          <td>{data.email}</td>
                          <td>{data.contactNumber}</td>
                          <td>{data.departmentId.name}</td>
                          <td>{data.address}</td>
                          <td>
                            <form onSubmit={this.handleSubmit2}>
                              <input
                                type="hidden"
                                value={data._id}
                                name="_id"
                              />
                              <button
                                type="submit"
                                className="btn btn-danger btn-sm"
                              >
                                <i className="fas fa-trash-alt" />
                              </button>
                            </form>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ud: state.ud,
    vd: state.vd,
    isLoading: state.loadingStatus.loading
  };
};

export default connect(
  mapStateToProps,
  { verifyUser, deleteUser }
)(Members);
