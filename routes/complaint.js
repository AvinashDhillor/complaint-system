const app = require('express').Router();
const _ = require('lodash');
const { authenticate } = require('../middleware/client/clientUserAuth');
const Complaint = require('../db/models/Complaint');

app.post('/create', authenticate, (req, res) => {
  if (req.user.role === 'department') {
    return res.send({ msg: "Sorry you don't have permission!" });
  }
  let data = {
    createdBy: req.user._id,
    departmentId: req.body.departmentId,
    title: req.body.title,
    text: req.body.text
  };
  let complaint = new Complaint(data);
  complaint
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/pending', authenticate, (req, res) => {
  if (req.user.role === 'department') {
    Complaint.find({ isPending: false, departmentId: req.user.departmentId })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
      });
  } else if (req.user.role === 'client') {
    Complaint.find({ isPending: true, createdBy: req.user._id })
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
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/rejected', authenticate, (req, res) => {
  Complaint.find({ isRejected: true, createdBy: req.user._id })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = app;
