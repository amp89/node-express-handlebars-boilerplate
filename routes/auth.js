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
        res.redirect("/auth/showinfo_dev");
    }
);

router.get("/showinfo_dev",(req,res) => {
    //Remove this, for testing auth only
    res.send(req.user);
    
})

module.exports = router;