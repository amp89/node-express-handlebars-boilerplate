const authObj = {
    ensureAuth: function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        } else {
            res.redirect("/");
        }
    }
}

module.exports = authObj;