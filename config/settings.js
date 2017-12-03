if(process.env.NODE_ENV == "production"){
    module.exports = require("./prod_keys");
} else {
    module.exports = require("./dev_keys");
};


// Prod and dev:
// module.exports = {
//     mongoURI:"<URI HERE>",
//     googleClientID:"<ID HERE">,
//     googleClientSecret:"<Secret here>"
// }