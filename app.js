const express = require("express")
const expressSession = require("express-session")
const handlebars = require("express-handlebars")
const mongoose = require("mongoose")
const passport = require("passport")
const serverConfig = require("./config/server")
const settings = require("./config/settings")

mongoose.Promise = global.Promise;
mongoose.connect(settings.mongoURI,{
    useMongoClient:true
}).then(
    () => console.log("Mongo connected!")
).catch(
    () => console.error("Mongo Failed to connect!")
)

//Register Models
require("./models/User")

const app = express();

app.use(expressSession({
    secret:settings.secret,
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
require("./config/passportSettings")(passport);

app.engine("handlebars", handlebars(
    {
        helpers:{},
        defaultLayout:"main"
    }
));
app.set("view engine","handlebars");

app.get("/",(req,res) => {
    res.render("index/index");
})

////routes

const auth = require("./routes/auth");
app.use("/auth",auth);



app.listen(serverConfig.port, () => {
    console.log(`listening on port ${serverConfig.port}`);
})
