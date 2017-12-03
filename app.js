const express = require("express")


const app = express();

app.use("/",(req,res) => {
    res.send("hey");
})

app.listen(5000, () => {
    console.log("listening")
})