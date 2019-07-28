import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

const Rejected = props => {
  return (
    <div style={{ marginLeft: '230px' }}>
      <div className="container d-flex justify-content-center flex-column align-items-center">
        {props.rejected.map(data => {
          return (
            <div className="col-11">
              <div class="card my-3 text-white bg-danger ">
                <div class="card-header">
                  {data.departmentId.name}
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
  return { rejected: state.rejected };
};

export default connect(mapStateToProps)(Rejected);
