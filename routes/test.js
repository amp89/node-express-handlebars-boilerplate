const express = require("express")
const router = express.Router();


const { ensureAuth } = require("../helpers/auth");

router.get("/form", ensureAuth, (req,res) => {
    res.send("hey i'm the form test page.");
})

module.exports = router;