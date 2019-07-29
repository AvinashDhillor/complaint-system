import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import {
  resolveComplaint,
  clearMessage
} from '../../actions/departmentUserActions';
import BlinkSpinner from '../common/BlinkSpinner';
import NothingToShow from '../common/NothingToShow';
import ToastPanel from '../common/ToastPanel';

class Pending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnable: false,
      text: ''
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    let data = {
      complaintId: e.target.complaintId.value,
      text: e.target.resolveData.value
    };
    this.props.resolveComplaint(data);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isMessage && !this.state.isEnable) {
      this.setState({
        isEnable: true,
        text: nextProps.msg
      });

      setTimeout(() => {
        this.props.clearMessage();
        this.setState({
          isEnable: false,
          text: ''
        });
      }, 3000);
    }
  }

  render() {
    return (
      <>
        <ToastPanel isEnable={this.state.isEnable} text={this.state.text} />

        <div style={{ marginLeft: '230px' }}>
          <div className="container d-flex justify-content-center flex-column align-items-center">
            {this.props.isLoading && <BlinkSpinner />}
            {!this.props.isLoading && this.props.pending.length === 0 && (
              <NothingToShow />
            )}
            {!this.props.isLoading &&
              this.props.pending.length !== 0 &&
              this.props.pending.map(data => {
                return (
                  <div className="col-11">
                    <div class="card my-3 text-white bg-info">
                      <div class="card-header">
                        {/* {data.departmentId.name}{' '} */}
                        <span>{moment(data.createdAt).fromNow()}</span>
                      </div>
                      <div class="card-body">
                        <h5 class="card-title">{data.title}</h5>
                        <p class="card-text">{data.text}</p>
                        <hr />
                        <form onSubmit={this.handleSubmit}>
                          <input
                            type="hidden"
                            name="complaintId"
                            value={data._id}
                          />
                          <div class="form-group">
                            <label for="complaint-resolve">
                              Resolve Complaint
                            </label>
                            <textarea
                              class="form-control"
                              id="complaint-resolve"
                              name="resolveData"
                              rows="3"
                            />
                          </div>
                          <button type="submit" class="btn btn-light mr-2">
                            <i class="fas fa-user-ninja mr-2" />
                            Resolve
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    pending: state.pending,
    isLoading: state.loadingStatus.loading,
    isMessage: !state.msg.isEmpty,
    msg: state.msg.text
  };
};

export default connect(
  mapStateToProps,
  { resolveComplaint, clearMessage }
)(Pending);
