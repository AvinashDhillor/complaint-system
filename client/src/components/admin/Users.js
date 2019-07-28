import React, { Component } from 'react';
import { connect } from 'react-redux';

import { verifyUser, deleteUser } from '../../actions/adminActions';

class Users extends Component {
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
            <h3 className="text-left text-black-50 display-4">Users Request</h3>

            <table class="table table-striped mt-4">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">S.No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone No.</th>
                  <th scope="col">Address</th>
                  <th scope="col">Approve</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.props.uc.map((data, i) => {
                  return (
                    <tr>
                      <th scope="row">{i + 1}</th>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.contactNumber}</td>
                      <td>{data.address}</td>
                      <td>
                        <form onSubmit={this.handleSubmit1}>
                          <input type="hidden" value={data._id} name="_id" />
                          <button
                            type="submit"
                            className="btn btn-success btn-sm"
                          >
                            <i class="fas fa-user-check" />
                          </button>
                        </form>
                      </td>
                      <td>
                        <form onSubmit={this.handleSubmit2}>
                          <input type="hidden" value={data._id} name="_id" />
                          <button
                            type="submit"
                            className="btn btn-danger btn-sm"
                          >
                            <i class="fas fa-trash-alt" />
                          </button>
                        </form>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="col-11 mt-4">
            <h3 className="text-info text-black-50 display-4">
              Approved Users
            </h3>

            <table class="table table-striped mt-4">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">S.No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone No.</th>
                  <th scope="col">Address</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.props.vc.map((data, i) => {
                  return (
                    <tr>
                      <th scope="row">{i + 1}</th>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.contactNumber}</td>
                      <td>{data.address}</td>
                      <td>
                        <form onSubmit={this.handleSubmit2}>
                          <input type="hidden" value={data._id} name="_id" />
                          <button
                            type="submit"
                            className="btn btn-danger btn-sm"
                          >
                            <i class="fas fa-trash-alt" />
                          </button>
                        </form>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    uc: state.uc,
    vc: state.vc
  };
};

export default connect(
  mapStateToProps,
  { verifyUser, deleteUser }
)(Users);
