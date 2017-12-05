const express = require("express")
const router = express.Router();


const { ensureAuth } = require("../helpers/auth");

router.get("/form", ensureAuth, (req,res) => {
    res.render("test/test");
})



router.post("/form", ensureAuth, (req,res) => {
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const confirmationForm = `${lastName}, ${firstName}`;
    res.render("test/test",{confirmationForm:confirmationForm});
})


router.get("/error",(req,res) => {
    throw 'Whatever error';
    res.render("index/index")
})

module.exports = router;