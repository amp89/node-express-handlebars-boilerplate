const nodemailer = require('nodemailer');
const { smtpConfig } = require("./config/dev_keys")


const trans = nodemailer.createTransport(smtpConfig);

let mail_op = {
  from: smtpConfig.auth.user,
  to: "alexander.peterson89@gmail.com",
  subject: 'Sending Email using Node.js',
  html: 'That was easy!'
};

trans.sendMail(mail_op, (err, info)=>{
  if(err){
    console.log(err);
  } else {
    console.log('Email sent: ' + info.response);
  }
});