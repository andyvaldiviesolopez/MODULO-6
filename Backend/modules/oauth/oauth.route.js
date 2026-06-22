const express = require("express")
const oauth = express.Router()
const passport = require("passport")
const session = require("express-session")
const Author = require("../authors/authors.schema")

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
        async (accessToken, refreshToken, profile, done) => {

            console.log(profile)

            const author = await Author.findOne({
                email: profile.emails[0].value
            })

            if (!author) {
                return done(new Error("Utente non trovato"))
            }

            return done(null, {
                id: author._id,
                email: author.email
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