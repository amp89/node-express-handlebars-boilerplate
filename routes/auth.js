const express = require("express");
const router = express.Router();

const passport= require("passport");

router.get("/googleauth",
    passport.authenticate("google", {scope: ["profile","email"]})
);

router.get("/googlecallback", (req,res) => {
    res.send(req);
})

module.exports = router;