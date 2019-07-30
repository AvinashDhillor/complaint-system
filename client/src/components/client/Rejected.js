import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import BlinkSpinner from '../common/BlinkSpinner';
import NothingToShow from '../common/NothingToShow';

const Rejected = props => {
  return (
    <div style={{ marginLeft: '230px' }}>
      <div className="container d-flex justify-content-center flex-column align-items-center">
        {props.isLoading && <BlinkSpinner />}
        {!props.isLoading && props.rejected.length === 0 && <NothingToShow />}
        {!props.isLoading &&
          props.rejected.length !== 0 &&
          props.rejected.map((data, i) => {
            return (
              <div className="col-11" key={i}>
                <div className="card my-3 text-white bg-danger ">
                  <div className="card-header">
                    {data.departmentId.name}
                    <span className="float-right">
                      {moment(data.createdAt).fromNow()}
                    </span>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{data.title}</h5>
                    <p className="card-text">{data.text}</p>
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
  return { rejected: state.rejected, isLoading: state.loadingStatus.loading };
};

export default connect(mapStateToProps)(Rejected);
