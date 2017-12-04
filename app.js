const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const expressSession = require("express-session");
const handlebars = require("express-handlebars");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const serverConfig = require("./config/server");
const settings = require("./config/settings");


//connect to mongo
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

//create app
const app = express();


//setup static/public file path
app.use(express.static(path.join(__dirname,"public")));

//setup cookie parser
app.use(cookieParser());

//setup body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//setup method override (allows put and delete)
app.use(methodOverride("_method"));

//setup session / passport
app.use(expressSession({
    secret:settings.secret,
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
require("./config/passportSettings")(passport);

//if you do this you can use "user" in the templates.
app.use((req,res,next) => {
    res.locals.user = req.user || null;
    next();
});

//set engine to handlebars
app.engine("handlebars", handlebars(
    {
        helpers:{},
        defaultLayout:"main"
    }
));
app.set("view engine","handlebars");


//routing
app.get("/",(req,res) => {
    res.render("index/index");
});
app.get("/privacy",(req,res) => {
    res.send("All this site uses is your google ID and email for identificaiton, and your Google + profile picture.");
});

//routes
const auth = require("./routes/auth");
const test = require("./routes/test");

app.use("/auth",auth);
app.use("/test",test);


//start app
app.listen(serverConfig.port, () => {
    console.log(`listening on port ${serverConfig.port}`);
})
