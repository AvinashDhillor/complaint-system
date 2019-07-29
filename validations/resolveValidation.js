const _ = require('lodash');
const check = require('validator');

const resolveValidation = data => {
  let { text } = data;
  let message = '';
  let count = 0;

  if (text.length < 10) {
    message += `${++count}. Length is Too short `;
  }

  return {
    isValid: _.isEmpty(message),
    message
  };
};

module.exports = resolveValidation;
