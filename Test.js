const nodemailer = require('nodemailer');
// const { text } = require('stream/consumers');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'omkarhalgi90@gmail.com',
    pass: 'gelc gydb eizp hhha'
  }
});

// const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'omkarhalgi50@gmail.com',
    to:'omkarhalgi8@gmail.com',
    subject:'Hello',
    text:'What have you done'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });