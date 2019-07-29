const app = require('express').Router();
const _ = require('lodash');

const { authenticate } = require('../middleware/client/clientUserAuth');
const Complaint = require('../db/models/Complaint');
const Resolved = require('../db/models/Resolved');
const DepartmentUser = require('../db/models/ClientUser');
const Department = require('../db/models/Department');

const signupValidation = require('../validations/signupValidation');
const resolveValidation = require('../validations/resolveValidation');

app.post('/users/signup', (req, res) => {
  var body = _.pick(req.body, [
    'name',
    'email',
    'password',
    'address',
    'role',
    'contactNumber'
  ]);

  let { isValid, message } = signupValidation(body);

  if (!isValid) {
    return res
      .status(400)
      .send({ msg: `oops! we got some problems.😨 ${message}` });
  }

  DepartmentUser.findOne({ email: body.email })
    .then(da => {
      if (da) {
        return res
          .status(400)
          .send({ msg: `wow 😲 Someone is already using this email 👎 ` });
      } else {
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
                  return res.send({
                    msg:
                      'yay! 🥳 Account is registered. Please ✔ verify your email account and ⏳ WAIT for admin approval'
                  });
                })
                .catch(err => {
                  console.log(err);
                });
            } else {
              return res.status(400).send({ msg: 'Department not Found' });
            }
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/resolve', authenticate, (req, res) => {
  if (req.user.role === 'department') {
    let data = {
      resolvedBy: req.user._id,
      departmentId: req.user.departmentId,
      complaintId: req.body.complaintId,
      text: req.body.text
    };
    let { isValid, message } = resolveValidation(data);
    if (!isValid) {
      return res
        .status(400)
        .send({ msg: `oops! we got some problems.😨 ${message}` });
    }
    const resolved = new Resolved(data);
    resolved
      .save()
      .then(data => {
        return data;
      })
      .then(result => {
        Complaint.findOneAndUpdate(
          { _id: result.complaintId },
          {
            $set: {
              isResolved: true,
              resolvedId: result._id,
              resolvedBy: result.resolvedBy
            }
          },
          { new: true }
        )
          .then(newda => {
            if (newda) {
              res.send({ msg: `Woohoo! You just resolved a issue.🐱‍👤👏` });
            }
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
