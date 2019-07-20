const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

//@user defined
const mongoose = require('./db/connect');
const clientUser = require('./routes/clientUser');

const app = express();

//@middlewares
app.use(bodyParser.json());
app.use('/client', clientUser);

const PORT = process.env.PORT || 5000;

app.listen(PORT, err => {
  if (err) {
    console.log('Unable connecting to server.');
  } else {
    console.log('Connected to server.');
  }
});
