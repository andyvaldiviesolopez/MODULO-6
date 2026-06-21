const jwt = require("jsonwebtoken")

const authGoogle = async (req, res, next) => {
    try {

        const user = encodeURIComponent(
            JSON.stringify(req.user)
        )

        res.redirect(
            `http://localhost:3000/oauth/success?user=${user}`
        )

    } catch (error) {
        next(error)
    }
}

const manageOAuthCallback = async (req, res, next) => {
    try {

        const user = req.user

        const token = jwt.sign(
            user,
            process.env.JWT_SECRET
        )
        res.redirect(
            `http://localhost:3000/oauth/success?token=${token}`
        )

    } catch (error) {
        next(error)
    }
}

module.exports = {
    authGoogle,
    manageOAuthCallback
}