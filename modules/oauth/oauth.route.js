const express = require("express")
const oauth = express.Router()
const passport = require("passport")
const session = require("express-session")

const GoogleStrategy = require("passport-google-oauth20").Strategy

const googleController = require("./google.oauth.controller")

oauth.use(
    session({
        secret: process.env.JWT_SECRET,
        resave: false,
        saveUninitialized: false
    })
)

oauth.use(passport.initialize())
oauth.use(passport.session())

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL
        },
        (accessToken, refreshToken, profile, done) => {

            console.log("GOOGLE STRATEGY CHIAMATA")

            return done(null, {
                id: "123",
                email: "test@test.it"
            })
        }
    )
)

oauth.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    }),
    googleController.authGoogle
)

oauth.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/"
    }),
    googleController.manageOAuthCallback
)

module.exports = oauth