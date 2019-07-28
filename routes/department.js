const app = require('express').Router();
const _ = require('lodash');

const Department = require('../db/models/Department');
const { authenticate } = require('../middleware/client/clientUserAuth');

app.post('/new', authenticate, (req, res) => {
  if (req.user.role === 'admin') {
    const data = _.pick(req.body, ['name']);
    const department = new Department(data);
    department
      .save()
      .then(data => {
        return res.send(data);
      })
      .catch(err => {
        console.log(err);
      });
  } else {
  }
});

app.get('/', (req, res) => {
  Department.find({})
    .sort({ name: 1 })
    .then(data => {
      res.send(data);
    })
    .catch(err => console.log(err));
});

module.exports = app;
