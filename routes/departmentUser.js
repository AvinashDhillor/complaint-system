const app = require('express').Router();
const _ = require('lodash');

const { authenticate } = require('../middleware/client/clientUserAuth');
const Complaint = require('../db/models/Complaint');
const Resolved = require('../db/models/Resolved');
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

app.post('/resolve', authenticate, (req, res) => {
  if (req.user.role === 'department') {
    let data = {
      resolvedBy: req.user._id,
      departmentId: req.user.departmentId,
      complaintId: req.body.complaintId,
      text: req.body.text
    };
    const resolved = new Resolved(data);
    resolved
      .save()
      .then(data => {
        return data;
      })
      .then(result => {
        Complaint.findOneAndUpdate(
          { _id: result.complaintId },
          { $set: { isResolved: true, resolvedId: result._id } },
          { new: true }
        )
          .then(newda => {
            return res.send(newda);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  } else {
  }
});

app.get('/resolved', authenticate, (req, res) => {
  if (req.user.role === 'department') {
    let data = {
      departmentId: req.user.departmentId,
      resolvedBy: req.user._id
    };
    Resolved.find(data)
      .sort({ createdAt: -1 })
      .populate('complaintId')
      .then(data => {
        res.send(data);
      })
      .catch(err => console.log(err));
  } else {
  }
});

app.get('/resolved/all', authenticate, (req, res) => {
  if (req.user.role === 'department') {
    let data = {
      departmentId: req.user.departmentId
    };
    Resolved.find(data)
      .sort({ createdAt: -1 })
      .populate('complaintId')
      .populate('resolvedBy')
      .then(data => {
        res.send(data);
      })
      .catch(err => console.log(err));
  } else {
  }
});

module.exports = app;
