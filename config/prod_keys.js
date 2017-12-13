// i should store these b64 or encrypted
module.exports = {
    mongoURI:process.env.MUI,
    googleClientID:process.env.GID,
    googleClientSecret:process.env.GCS,

    secret:process.env.SK,

    smtpConfig : {
        host: process.env.SH,
        port: process.env.SP,
        secure: true,//process.env.SB,
        auth: {
            user: process.env.SAU,
            pass: process.env.SAP
        }
    }



}