import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import BlinkSpinner from '../common/BlinkSpinner';
import NothingToShow from '../common/NothingToShow';

class Resolved extends Component {
  render() {
    return (
      <div style={{ marginLeft: '230px' }}>
        <div className="container d-flex justify-content-center flex-column align-items-center">
          {this.props.isLoading && <BlinkSpinner />}
          {!this.props.isLoading && this.props.resolved.length === 0 && (
            <NothingToShow />
          )}
          {!this.props.isLoading &&
            this.props.resolved.length !== 0 &&
            this.props.resolved.map((data, i) => {
              return (
                <div className="col-11" key={i}>
                  <div className="card my-3 text-white bg-info">
                    <div className="card-header">
                      {/* {data.departmentId.name}{' '} */}
                      <span>
                        {moment(data.complaintId.createdAt).fromNow()}
                      </span>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{data.complaintId.title}</h5>
                      <p className="card-text">{data.complaintId.text}</p>
                      <hr />
                      <div className="card bg-dark">
                        <div className="card-header">
                          {/* {data.departmentId.name}{' '} */}
                          You
                          <span className="float-right">
                            {moment(data.createdAt).fromNow()}
                          </span>
                        </div>
                        <div className="card-body">{data.text}</div>
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
  return {
    resolved: state.resolved,
    isLoading: state.loadingStatus.loading
  };
};

export default connect(mapStateToProps)(Resolved);
