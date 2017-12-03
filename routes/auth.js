const express = require("express");
const router = express.Router();

const passport= require("passport");

router.get("/googleauth",
    passport.authenticate("google", {scope: ["profile","email"]})
);

router.get("/googlecallback",
    passport.authenticate("google",{failureRedirect:"/"},),
    (req,res) => {
        res.redirect("/auth/showinfo_dev");
    }
);

router.get("/showinfo_dev",(req,res) => {
    // res.send(req.user)
    res.send("<h1>Hi</h1>");
})

module.exports = router;