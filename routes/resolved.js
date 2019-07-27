const app = require('express').Router();
const _ = require('lodash');

const Resolved = require('../db/models/Resolved');

app.post('/create', (req, res) => {
  let data = _.pick(req.body, []);
});

app.get('/show', (req, res) => {});

module.exports = app;
