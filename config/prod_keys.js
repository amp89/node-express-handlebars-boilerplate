module.exports = {
    mongoURI:process.env.MUI,
    googleClientID:process.env.GID,
    googleClientSecret:process.env.GCS,

    secret:process.env.SK,

    smtpConfig : {
        host: process.env.SH,
        port: process.env.SP,
        secure: process.env.SB,
        auth: {
            user: process.env.SAU,
            pass: process.env.SAP
        }
    }



}