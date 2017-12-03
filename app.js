const express = require("express")
const serverConfig = require("./config/server")

const app = express();

app.use("/",(req,res) => {
    res.send("hey");
})

app.listen(serverConfig.port, () => {
    console.log(`listening on port ${serverConfig.port}`);
})