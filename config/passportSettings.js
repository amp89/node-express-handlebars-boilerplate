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
                const googleUserId = profile.id;
                User.findOne({googleID:googleUserId}).then(
                    user => {
                        if(user){
                            done(null,user)
                        }else{
                            const imageUrl = profile.photos[0].value.substring(0,profile.photos[0].value.indexOf("?"));
                            const newUser = User({
                                googleID:googleUserId,
                                firstName:profile.name.givenName,
                                lastName: profile.name.familyName,
                                email: profile.emails[0].value,
                                image: imageUrl,
                            })
                            newUser.save().then(
                                user => {
                                    console.log("saved new user: ", user);
                                    done(null,user);
                                }
                            ).catch(
                                error => {
                                    console.error("failed to save new user: ", user," error: ", error);
                                    done(null,user);
                                }
                            )
                        }
                    }

                ).catch(
                    err => console.error("Failed to find user: ", err)
                )

            }
        )
    ),//passport.use
    passport.serializeUser((user,done) => {
        if(user){
            const userId = user.id;
            done(null,userId);
        }else{
            console.error("there was no user id for user: ", user)
            done(null,null);
        }
        
    }),
    passport.deserializeUser((userId, done) => {
        User.findById(userId).then(            
            userObject => {
                done(null,userObject); //user object is 2nd param (do mognoose lookup)
                
            }
        ).catch(
            err => {
                console.error("Failed to find user with id: ", userId)
                done(null,null);
            }
        )
        
    })
}