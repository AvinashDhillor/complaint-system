import React, { Component } from 'react';
import {
  getDepartments,
  clearMessage
} from '../../actions/departmentUserActions';
import { createComplaint } from '../../actions/clientUserActions';
import { connect } from 'react-redux';
import ToastPanel from '../common/ToastPanel';

export class CreateComplaint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      department: '',
      isLoading: false,
      departments: [{ name: '' }],
      isEnable: false,
      text: ''
    };
  }

  onSubmit = e => {
    e.preventDefault();
    let data = {
      title: this.state.title,
      text: this.state.description,
      department: this.state.department
    };
    this.props.createComplaint(data, this.props.history);
  };

  componentDidMount() {
    this.props.getDepartments();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isLoading: nextProps.isLoading,
      departments: nextProps.departments
    });

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

  onTitleChange = e => {
    let data = e.target.value;
    this.setState({
      title: data
    });
  };

  onDepartmentChange = e => {
    let data = e.target.value;
    this.setState({
      department: data
    });
  };

  onDescriptionChange = e => {
    let data = e.target.value;
    this.setState({
      description: data
    });
  };

  render() {
    return (
      <>
        <ToastPanel isEnable={this.state.isEnable} text={this.state.text} />

        <div style={{ marginLeft: '230px' }}>
          <div className="d-flex justify-content-center ">
            <div className="col-lg-9">
              <div className="card my-5">
                <div className="card-header bg-info text-white">
                  <i className="fas fa-box-open mr-2" />
                  Complaint Box
                </div>
                <div className="card-body">
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <label htmlFor="title">Title</label>
                      <input
                        onChange={this.onTitleChange}
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Enter complaint title"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="department">Select Department</label>
                      <select
                        className="form-control"
                        id="department"
                        onChange={this.onDepartmentChange}
                      >
                        <option selected disabled>
                          Select Department
                        </option>
                        {this.state.departments.map((val, i) => {
                          return <option key={i}>{val.name}</option>;
                        })}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="complaint-description">Description</label>
                      <textarea
                        onChange={this.onDescriptionChange}
                        className="form-control"
                        id="complaint-description"
                        rows="4"
                        placeholder="Add a description..."
                      />
                    </div>

                    <button type="submit" className="btn btn-info float-right">
                      <i className="fas fa-paper-plane mr-2" />
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.loadingStatus.loading,
  departments: state.departments,
  isMessage: !state.msg.isEmpty,
  msg: state.msg.text
});

export default connect(
  mapStateToProps,
  { getDepartments, createComplaint, clearMessage }
)(CreateComplaint);
