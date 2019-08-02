const app = require('express').Router();
const _ = require('lodash');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../db/models/ClientUser');
const { authenticate } = require('../middleware/client/clientUserAuth.js');
const sendMail = require('../middleware/mail');
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
            return user.generateAuthToken('verify');
          })
          .then(token => {
            sendMail(
              req.body.email,
              'Please verify your email account 🕵️‍',
              `http://complaint-box-9466.herokuapp.com/verify/token/${token}`
            );
            return res.send({
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

app.get('/verify/:token', (req, res) => {
  let token = req.params.token;
  let decoded = jwt.verify(token, process.env.SECRET_KEY);
  let { _id } = decoded;
  User.findOneAndUpdate(
    { _id, tokens: { $elemMatch: { access: 'verify', token: token } } },
    { $set: { isActivated: true, tokens: [] } },
    { new: true }
  )
    .then(result => {
      return res.send({
        msg: 'Email verification is Successful 🎉'
      });
    })
    .catch(err => {
      res.status(400).send({ msg: 'Invalid email verification link.😑' });
      console.log(err);
    });
});

app.post('/forget/password', (req, res) => {
  let { email } = req.body;
  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .send({ msg: 'Please provide a valid email address 🕵️‍' });
  }
  User.findOne({ email })
    .then(user => {
      return user.generateAuthToken('forget');
    })
    .then(token => {
      sendMail(
        req.body.email,
        'Reset Password ✏',
        `http://complaint-box-9466.herokuapp.com/reset/token/${token}`
      );
      return res.send({
        msg: 'Reset password link is on the way 🚐. Please check you mail 📩'
      });
    })
    .catch(err => {
      res
        .status(400)
        .send('There is some error sending password reset link 🤧');
      console.log(err);
    });
});

app.post('/reset/password/:token', (req, res) => {
  let token = req.params.token;
  let decoded = jwt.verify(token, process.env.SECRET_KEY);
  let { _id } = decoded;
  let { newPassword } = req.body;
  User.findOne({
    _id,
    tokens: { $elemMatch: { access: 'forget', token: token } }
  })
    .then(user => {
      if (user) {
        user.password = newPassword;
        user.isActivated = true;
        user.tokens = [];
        user.save().then(data => {
          return res.send({
            msg: 'New password is set 🤩. You may now login into your account 🏳'
          });
        });
      }
    })
    .catch(err => {
      res.status(400).send({
        msg: 'Invalid reset password link 😌'
      });
      console.log(err);
    });
});

app.post('/password/change', authenticate, (req, res) => {
  let { _id } = req.user._id;

  let { oldPassword, newPassword } = req.body;

  if (oldPassword.length < 6 || newPassword.length < 6) {
    return res.status(400).send({ msg: 'Password length is too short 😑' });
  }

  User.findOne({ _id })
    .then(user => {
      bcrypt.compare(oldPassword, user.password, (err, result) => {
        if (!result) {
          return res.status(400).send({
            msg: `Given old password is incorrect🤪`
          });
        } else {
          user.password = newPassword;
          // user.tokens = [];
          user.save().then(result => {
            return res.send({
              msg: `Password is successfully changed 👷‍ Please login with new password 🔑`
            });
          });
        }
      });
    })
    .catch(err => {
      res
        .status(400)
        .send({ msg: `Error!!! 😱 Sorry, We couldn't change your password` });
      console.log(err);
    });
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
        return res.status(400).send({
          msg: `Hi ${user.name}, Please verify your email account first!🙏`
        });
      }
      if (!user.isVerified) {
        return res.status(400).send({
          msg: `Sorry ${user.name}, Admin didn't approve your account yet.🥱`
        });
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
      return res.status(200).send();
    }
    // () => {
    //   res.status(400).send();
    // }
  );
});

module.exports = app;
