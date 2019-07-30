import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  loadComplaints,
  rejectComplaint,
  approveComplaint
} from '../../actions/adminActions';
import BlinkSpinner from '../common/BlinkSpinner';
import NothingToShow from '../common/NothingToShow';

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
          {}
          {this.props.isLoading && <BlinkSpinner />}
          {!this.props.isLoading && this.props.pending.length === 0 && (
            <NothingToShow />
          )}
          {!this.props.isLoading &&
            this.props.pending.length !== 0 &&
            this.props.pending.map((data, i) => {
              return (
                <div className="col-11" key={i}>
                  <div className="card my-3 text-white bg-info ">
                    <div className="card-header">
                      <span className="badge badge-light">
                        <i className="fas fa-university" />{' '}
                        {data.departmentId.name}
                      </span>{' '}
                      <span className="badge badge-warning">
                        <i className="fas fa-user-tag" /> {data.createdBy.name}
                      </span>{' '}
                      <span className="badge badge-dark">
                        <i className="fas fa-at" /> {data.createdBy.email}
                      </span>
                      <span className="float-right">
                        {moment(data.createdAt).fromNow()}
                      </span>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{data.title}</h5>
                      <p className="card-text">{data.text}</p>
                      <div className="row">
                        <form onSubmit={this.handleSubmit1}>
                          <input type="hidden" value={data._id} name="_id" />
                          <button type="submit" className="btn btn-info ">
                            <i className="fas fa-check mr-2" />
                            Approve
                          </button>
                        </form>
                        <form onSubmit={this.handleSubmit2}>
                          <input type="hidden" value={data._id} name="_id" />
                          <button type="submit" className="btn btn-info ">
                            <i className="fas fa-times mr-2" />
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
  return { pending: state.pending, isLoading: state.loadingStatus.loading };
};

export default connect(
  mapStateToProps,
  { loadComplaints, rejectComplaint, approveComplaint }
)(Complaints);
