const express = require("express");
const router = express.Router();

const { ensureAuth } = require("../helpers/auth");


router.get("/", ensureAuth, (req,res) => {
    res.render("test/test");
});


router.post("/", ensureAuth, (req,res) => {
    
});


