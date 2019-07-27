const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema(
  {
    name: {
      type: String,
      require: true
    }
  },
  {
    timestamps: true
  }
);

const Department = mongoose.model('Department', DepartmentSchema);

module.exports = Department;
