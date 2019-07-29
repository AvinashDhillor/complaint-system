import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import BlinkSpinner from '../common/BlinkSpinner';
import NothingToShow from '../common/NothingToShow';

const Pending = props => {
  return (
    <div style={{ marginLeft: '230px' }}>
      <div className="container d-flex justify-content-center flex-column align-items-center">
        {props.isLoading && <BlinkSpinner />}
        {!props.isLoading && props.pending.length === 0 && <NothingToShow />}
        {!props.isLoading &&
          props.pending.length !== 0 &&
          props.pending.map(data => {
            return (
              <div className="col-11">
                <div class="card my-3 text-white bg-dark ">
                  <div class="card-header">
                    {data.departmentId.name}{' '}
                    <span className="float-right">
                      {moment(data.createdAt).fromNow()}
                    </span>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">{data.title}</h5>
                    <p class="card-text">{data.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { pending: state.pending, isLoading: state.loadingStatus.loading };
};

export default connect(mapStateToProps)(Pending);
