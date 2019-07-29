const app = require('express').Router();
const _ = require('lodash');

const User = require('../db/models/ClientUser');
const { authenticate } = require('../middleware/client/clientUserAuth.js');

//@ Validators
const loginValidation = require('../validations/loginValidation');
const signupValidation = require('../validations/signupValidation');

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

  User.findOne({ email: body.email })
    .then(da => {
      if (da) {
        return res
          .status(400)
          .send({ msg: `wow 😲 Someone is already using this email 👎 ` });
      } else {
        let user = new User(body);
        user
          .save()
          .then(() => {
            return user.generateAuthToken('auth');
          })
          .then(token => {
            res.header('cu-auth', token).send({
              msg:
                'yay! 🥳 Account is registered. Please ✔ verify your email account and ⏳ WAIT for admin approval'
            });
          })
          .catch(e => {
            res.status(400).send(e);
          });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  let { isValid, message } = loginValidation(body);
  if (!isValid) {
    return res
      .status(400)
      .send({ msg: `sorry, we have some problems.😣 ${message}` });
  }
  User.findByCredentials(body.email, body.password)
    .then(user => {
      if (!user.isActivated) {
        return res
          .status(400)
          .send({ msg: `Please verify your email account first!🙏` });
      }
      if (!user.isVerified) {
        return res
          .status(400)
          .send({ msg: `Admin didn't approve your account yet.🥱` });
      }
      return user.generateAuthToken('auth').then(token => {
        res.header('cu-auth', token).send({ user, token });
      });
    })
    .catch(e => {
      res.status(400).send({ msg: `Invalid email and password Credentials🤨` });
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
