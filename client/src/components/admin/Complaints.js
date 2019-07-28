import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  loadComplaints,
  rejectComplaint,
  approveComplaint
} from '../../actions/adminActions';

class Complaints extends Component {
  handleSubmit1 = e => {
    e.preventDefault();
    let data = {
      _id: e.target._id.value
    };
    this.props.approveComplaint(data);
  };

  handleSubmit2 = e => {
    e.preventDefault();

    let data = {
      _id: e.target._id.value
    };

    this.props.rejectComplaint(data);
  };

  render() {
    return (
      <div style={{ marginLeft: '230px' }}>
        <div className="container d-flex justify-content-center flex-column align-items-center">
          {this.props.pending.map(data => {
            return (
              <div className="col-11">
                <div class="card my-3 text-white bg-info ">
                  <div class="card-header">
                    <span class="badge badge-light">
                      {data.departmentId.name}
                    </span>{' '}
                    <span class="badge badge-warning">
                      {data.createdBy.name}
                    </span>{' '}
                    <span class="badge badge-dark">{data.createdBy.email}</span>
                    <span className="float-right">
                      {moment(data.createdAt).fromNow()}
                    </span>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">{data.title}</h5>
                    <p class="card-text">{data.text}</p>
                    <div className="row">
                      <form onSubmit={this.handleSubmit1}>
                        <input type="hidden" value={data._id} name="_id" />
                        <button type="submit" class="btn btn-info ">
                          <i class="fas fa-check mr-2" />
                          Approve
                        </button>
                      </form>
                      <form onSubmit={this.handleSubmit2}>
                        <input type="hidden" value={data._id} name="_id" />
                        <button type="submit" class="btn btn-info ">
                          <i class="fas fa-times mr-2" />
                          Reject
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { pending: state.pending };
};

export default connect(
  mapStateToProps,
  { loadComplaints, rejectComplaint, approveComplaint }
)(Complaints);
