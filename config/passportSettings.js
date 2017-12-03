const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const settings = require("./settings");

const User = mongoose.model("users");


module.exports = (passport) => {
    passport.use(
        new GoogleStrategy({
                clientID:settings.googleClientID,
                clientSecret:settings.googleClientSecret,
                callbackURL:"/auth/googlecallback",
                proxy:true // this if for heroku
            },
            (accessToken, refreshToken, profile, done) => {
                console.log(accessToken);
                console.log(profile);
                //Make a new user here
            }
        )
    ),//passport.use
    passport.serializeUser((user,done) => {
        done(null,null); // user id is 2nd param
    }),
    passport.deserializeUser((userId, done) => {
        done(null,null); //user object is 2nd param (do mognoose lookup)
    })
}