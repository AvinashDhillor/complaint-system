import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDepartments } from '../../actions/departmentUserActions';
import { addDepartment, deleteDepartment } from '../../actions/adminActions';
import BlinkSpinner from '../common/BlinkSpinner';

class Departments extends Component {
  componentDidMount() {
    this.props.getDepartments();
  }

  handleSubmit = e => {
    e.preventDefault();
    let data = {
      name: e.target.dname.value
    };
    this.props.addDepartment(data);
    e.target.dname.value = '';
  };

  handleSubmit2 = e => {
    e.preventDefault();
    let data = {
      _id: e.target._id.value
    };
    this.props.deleteDepartment(data);
  };

  render() {
    return (
      <div style={{ marginLeft: '230px' }}>
        <div className="d-flex justify-content-center">
          <div className="col-9 mt-4">
            <h3 className="text-left text-info text-black-50 display-4">
              Add Department
            </h3>
            <form onSubmit={this.handleSubmit}>
              <div class="input-group mt-4 mb-3">
                <input
                  type="text"
                  class="form-control"
                  name="dname"
                  placeholder="Enter department name"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                />
                <div class="input-group-append">
                  <button class="btn btn-info" type="submit" id="button-addon2">
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="col-9 mt-4">
            <h3 className="text-info text-black-50 display-4">Departments</h3>
            {this.props.isLoading && <BlinkSpinner />}
            <div class="list-group mt-4 ">
              {!this.props.isLoading &&
                this.props.departments.map(data => {
                  return (
                    <a class="list-group-item list-group-item-action">
                      {data.name}
                      <form
                        className="float-right"
                        onSubmit={this.handleSubmit2}
                      >
                        <input type="hidden" value={data._id} name="_id" />
                        <button type="submit" className="btn btn-danger btn-sm">
                          <i class="fas fa-trash-alt" />
                        </button>
                      </form>
                    </a>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    departments: state.departments,
    isLoading: state.loadingStatus.loading
  };
};

export default connect(
  mapStateToProps,
  { getDepartments, addDepartment, deleteDepartment }
)(Departments);
