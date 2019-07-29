const _ = require('lodash');
const check = require('validator');

const complaintValidation = data => {
  let { title, text } = data;
  let message = '';
  let count = 0;
  if (title.length < 5) {
    message += `${++count}. Title is Too short `;
  }
  if (text.length < 10) {
    message += `${++count}. Complaint is Too short `;
  }

  return {
    isValid: _.isEmpty(message),
    message
  };
};

module.exports = complaintValidation;
