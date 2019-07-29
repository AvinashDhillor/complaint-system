import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadadmin } from '../../actions/adminActions';
import BlinkSpinner from '../common/BlinkSpinner';

class ShowAdmins extends Component {
  componentDidMount() {
    this.props.loadadmin();
  }

  render() {
    return (
      <div style={{ marginLeft: '230px' }}>
        <div className="d-flex justify-content-center">
          <div className="col-11 mt-4">
            <h3 className="text-left text-black-50 display-4">Admins</h3>

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
                {this.props.isLoading && <BlinkSpinner />}
                {!this.props.isLoading &&
                  this.props.ad.map((data, i) => {
                    return (
                      <tr>
                        <th scope="row">{i + 1}</th>
                        <td>{data.name}</td>
                        <td>{data.email}</td>
                        <td>{data.contactNumber}</td>
                        <td>{data.address}</td>

                        <td>
                          <button className="btn btn-danger btn-sm">
                            <i class="fas fa-trash-alt" />
                          </button>
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
    ad: state.ad,
    isLoading: state.loadingStatus.loading
  };
};

export default connect(
  mapStateToProps,
  { loadadmin }
)(ShowAdmins);
