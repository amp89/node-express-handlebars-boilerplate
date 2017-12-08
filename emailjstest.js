const emailjs = require("emailjs");
const { smtpConfig } = require("./config/settings");

var mailServer = emailjs.server.connect({
    user: smtpConfig.auth.user,
    password: smtpConfig.auth.pass,
    host: smtpConfig.host,
    ssl: true,
    tls: true,
})


mailServer.send({
    text:"text",
    from:smtpConfig.auth.user,
    to:smtpConfig.auth.user,
    cc:smtpConfig.auth.user,
    subject:"subject"
}, (err,msg) =>{
    console.log( err || msg );
})