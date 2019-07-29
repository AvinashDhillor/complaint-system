const _ = require('lodash');
const check = require('validator');

const loginValidation = data => {
  let { email, password } = data;
  let message = '';
  let count = 0;
  if (!check.isEmail(email)) {
    message += `${++count}.Invalid Email `;
  }
  if (password.length < 6) {
    message += `${++count}.Too short password `;
  }

  return {
    isValid: _.isEmpty(message),
    message
  };
};

module.exports = loginValidation;
