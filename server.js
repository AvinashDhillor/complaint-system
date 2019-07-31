const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sendMail = require('./middleware/mail');
//@ User defined
const mongoose = require('./db/connect');
const path = require('path');

//@ Routes
const clientUser = require('./routes/clientUser');
const departmentUser = require('./routes/departmentUser');
const complaint = require('./routes/complaint');
const department = require('./routes/department');
const resolved = require('./routes/resolved');
const admin = require('./routes/admin');

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//@middlewares
app.use(bodyParser.json());
app.use('/c', clientUser);
app.use('/department', department);
app.use('/d', departmentUser);
app.use('/complaint', complaint);
app.use('/resolved', resolved);
app.use('/admin', admin);

const PORT = process.env.PORT || 5000;

app.listen(PORT, err => {
  if (err) {
    console.log('Unable connecting to server.');
  } else {
    console.log('Connected to server.');
  }
});
