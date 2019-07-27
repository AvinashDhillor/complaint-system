const app = require('express').Router();
const _ = require('lodash');

const Department = require('../db/models/Department');

app.post('/new', (req, res) => {
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
});

app.get('/', (req, res) => {
  Department.find({}, { name: 1, _id: 0 })
    .then(data => {
      return res.send(data);
    })
    .catch(err => console.log(err));
});

module.exports = app;
