const nodemailer = require("nodemailer");
const { smtpConfig } = require("./config/settings")

// let transporter = nodemailer.createTransport({
//     service:"yahoo",
//     auth: {
//         user: smtpConfig.auth.user,
//         pass: smtpConfig.auth.pass
//     }
// })
console.log(smtpConfig);
let transporter = nodemailer.createTransport(smtpConfig);

transporter.verify(function(error, success) {
    if (error) {
         console.log(error);
    } else {
         console.log('Server is ready to take our messages');
    }
 });