const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = (email, subject, html) => {
  sgMail
    .send({
      to: email,
      from: process.env.SENDER_MAIL,
      subject: subject,
      html: html
    })
    .then(() => {
      console.log('Mail Sent Succesfully');
    })
    .catch(e => {
      console.log(e);
    });
};

module.exports = sendMail;
