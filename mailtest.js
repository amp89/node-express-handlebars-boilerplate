const nodemailer = require('nodemailer');
const { smtpConfig } = require("./config/dev_keys")


const transporter = nodemailer.createTransport(smtpConfig);

const mailOptions = {
  from: smtpConfig.auth.user,
  to: "alexander.peterson89@gmail.com",
  subject: 'Sending Email using Node.js',
  html: 'That was easy!'
};

transporter.sendMail(mailOptions, (err, info)=>{
  if(err){
    console.log(err);
  } else {
    console.log('Email sent: ' + info.response);
  }
});