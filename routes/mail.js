const express = require("express");
const { smtpConfig } = require("../config/settings")
const nodemailer = require("nodemailer");
const router = express.Router();

const { ensureAuth } = require("../helpers/auth");

//Testing Mailer



// const transporter = nodemailer.createTransport(smtpConfig);
let transporter = nodemailer.createTransport({
    service:"Yahoo",
    auth: {
        user: smtpConfig.auth.user,
        pass: smtpConfig.auth.pass
    }
})


router.get("/", ensureAuth, (req,res) => {

    res.render("mail/index");

})

router.post("/", ensureAuth, (req,res) => {
    let sender = req.user;
    let toEmail = req.body.email;
    let subject = req.body.subject;
    let emailBody = req.body.body;

    console.log("sender: ", sender);
    console.log("toEmail: ", toEmail);
    console.log("subject: ", subject);
    console.log("emailBody: ", emailBody);

    let mailOptions = {
        from: smtpConfig.auth.user,
        to: "alexpetersondev@yahoo.com",
        subject: "test",
        text: "test",
        //html: htmlstuff

    }

    transporter.sendMail(mailOptions, (error,done) => {
        if(error){
            console.error("FAILED TO SEND MAIL: ", error);
            req.flash("error_msg","you did something wrong, probably")
            res.redirect("/mail");

        } else {
            req.flash("success_msg","thanks dude, you can send another one if you want")
            res.redirect("/mail");
        }
    });


    
})

module.exports = router;