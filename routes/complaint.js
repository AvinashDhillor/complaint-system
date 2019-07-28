const app = require('express').Router();
const _ = require('lodash');
const { authenticate } = require('../middleware/client/clientUserAuth');
const Complaint = require('../db/models/Complaint');
const Department = require('../db/models/Department');

app.post('/create', authenticate, (req, res) => {
  if (req.user.role === 'department') {
    return res.send({ msg: "Sorry you don't have permission!" });
  }

  let departmentName = req.body.department;
  Department.findOne({ name: departmentName })
    .then(data => {
      if (data) {
        let { _id } = data;
        let da = {
          createdBy: req.user._id,
          departmentId: _id,
          title: req.body.title,
          text: req.body.text
        };
        let complaint = new Complaint(da);
        complaint
          .save()
          .then(data => {
            res.send(data);
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

app.get('/pending', authenticate, (req, res) => {
  if (req.user.role === 'department') {
    Complaint.find({
      isPending: false,
      isRejected: false,
      isResolved: false,
      departmentId: req.user.departmentId
    })
      .populate('departmentId')
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
      });
  } else if (req.user.role === 'client') {
    Complaint.find({
      isResolved: false,
      isRejected: false,
      createdBy: req.user._id
    })
      .populate('departmentId')
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
});

app.get('/resolved', authenticate, (req, res) => {
  Complaint.find({ isResolved: true, createdBy: req.user._id })
    .sort({ createdAt: -1 })
    .populate('resolvedId')
    .populate('resolvedBy')
    .populate('departmentId')
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/rejected', authenticate, (req, res) => {
  Complaint.find({ isRejected: true, createdBy: req.user._id })
    .populate('departmentId')
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = app;
