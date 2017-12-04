const express = require("express");
const router = express.Router();

const passport= require("passport");

router.get("/googleauth",
    passport.authenticate("google", {scope: ["profile","email"]})
);

router.get("/googlecallback",
    passport.authenticate(
        "google",
        {
            failureRedirect:"/",
            
        }),
    (req,res) => {
        console.log(req.user)
        req.flash("success_msg","You logged in! <Test flash success_msg>");
        req.flash("error_msg","You logged in! <Test flash error_msg>");
        res.redirect("/");
    }
);



router.get("/logout", (req,res) => {
    req.logout();
    res.redirect("/")
});

module.exports = router;