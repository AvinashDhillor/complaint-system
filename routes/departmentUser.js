const app = require('express').Router();
const _ = require('lodash');

const DepartmentUser = require('../db/models/ClientUser');
const Department = require('../db/models/Department');

app.post('/users/signup', (req, res) => {
  var body = _.pick(req.body, [
    'name',
    'email',
    'password',
    'address',
    'role',
    'contactNumber'
  ]);

  let departmentName = req.body.department;
  Department.findOne({ name: departmentName })
    .then(data => {
      if (data) {
        let { _id } = data;
        let departmentUser = new DepartmentUser({
          ...body,
          departmentId: _id
        });

        departmentUser
          .save()
          .then(data => {
            return res.send(data);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        return res.send({ msg: 'Department not Found' });
      }
    })
    .catch(err => console.log(err));
});

module.exports = app;
