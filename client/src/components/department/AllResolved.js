import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import BlinkSpinner from '../common/BlinkSpinner';
import NothingToShow from '../common/NothingToShow';

class AllResolved extends Component {
  render() {
    return (
      <div style={{ marginLeft: '230px' }}>
        <div className="container d-flex justify-content-center flex-column align-items-center">
          {this.props.isLoading && <BlinkSpinner />}
          {!this.props.isLoading && this.props.allresolved.length === 0 && (
            <NothingToShow />
          )}
          {!this.props.isLoading &&
            this.props.allresolved.length !== 0 &&
            this.props.allresolved.map(data => {
              return (
                <div className="col-11">
                  <div class="card my-3 text-white bg-info">
                    <div class="card-header">
                      {/* {data.departmentId.name}{' '} */}
                      <span>
                        {moment(data.complaintId.createdAt).fromNow()}
                      </span>
                    </div>
                    <div class="card-body">
                      <h5 class="card-title">{data.complaintId.title}</h5>
                      <p class="card-text">{data.complaintId.text}</p>
                      <hr />
                      <div class="card bg-dark">
                        <div class="card-header">
                          {/* {data.departmentId.name}{' '} */}
                          {data.resolvedBy.name}
                          <span className="float-right">
                            {moment(data.createdAt).fromNow()}
                          </span>
                        </div>
                        <div class="card-body">{data.text}</div>
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
    allresolved: state.allresolved,
    isLoading: state.loadingStatus.loading
  };
};

export default connect(mapStateToProps)(AllResolved);
