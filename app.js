const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const expressSession = require("express-session");
const flash = require("connect-flash");
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

//use flash messages
app.use(flash());

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

//flash messages / global vars (eg: user accessible in templates)
app.use((req,res,next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");

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




//error catch middleware NOTE: This must go last
app.use((err,req,res,next) => {
    res.status(500);
    // next();
    res.send("I am a generic message informing you that there was some sort of error somewhere.");
});


//socketio stuff
var server = require("http").createServer(app);
var io = require("socket.io")(server);

io.on("connection", (socket) => {
    socket.emit("thischannel", {data:"hi",data2:"hello"});
    socket.on("thischannel", data => {
        console.log("SOCKET MSG ON thischannel: ", data);
    })
})

//TODO MOVE TO TEST ROUTES
app.get("/socket-test", (req,res) => {
    res.render("test/socket_test");
});

//start app
// app.listen(serverConfig.port, () => {
server.listen(serverConfig.port, () => {
    console.log(`listening on port ${serverConfig.port}`);
})





