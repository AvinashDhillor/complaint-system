const _ = require('lodash');
const check = require('validator');

const signupValidation = data => {
  let { name, email, password, address, role, contactNumber } = data;
  let message = '';
  let count = 0;
  if (name.length < 2) {
    message += `${++count}. Too short name `;
  }
  if (!check.isEmail(email)) {
    message += `${++count}. Invalid Email `;
  }
  if (password.length < 6) {
    message += `${++count}. Too short password `;
  }
  if (address.length < 6) {
    message += `${++count}. Too short address `;
  }
  if (role.length < 3) {
    message += `${++count}. Invalid role `;
  }
  if (!check.isMobilePhone(contactNumber)) {
    message += `${++count}. Invalid contact number `;
  }

  return {
    isValid: _.isEmpty(message),
    message
  };
};

module.exports = signupValidation;
