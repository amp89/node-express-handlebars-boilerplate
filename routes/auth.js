const express = require("express");
const router = express.Router();

const passport= require("passport");

router.get("/googleauth",
    passport.authenticate("google", {scope: ["profile","email"]})
);

router.get("/googlecallback",
    passport.authenticate(
        "google",
        {failureRedirect:"/"}),
    (req,res) => {
        console.log(req.user)
        res.redirect("/");
    }
);



router.get("/logout", (req,res) => {
    req.logout();
    res.redirect("/")
});

module.exports = router;