const app = require('express').Router();
const _ = require('lodash');

const User = require('../db/models/ClientUser');
const { authenticate } = require('../middleware/client/clientUserAuth.js');

app.post('/users/signup', (req, res) => {
  var body = _.pick(req.body, [
    'name',
    'email',
    'password',
    'address',
    'contactNumber'
  ]);
  let user = new User(body);
  user
    .save()
    .then(() => {
      return user.generateAuthToken('auth');
    })
    .then(token => {
      res.header('cu-auth', token).send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  console.log(body);

  User.findByCredentials(body.email, body.password)
    .then(user => {
      return user.generateAuthToken('auth').then(token => {
        res.header('cu-auth', token).send(user);
      });
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(
    () => {
      res.status(200).send();
    },
    () => {
      res.status(400).send();
    }
  );
});

module.exports = app;
