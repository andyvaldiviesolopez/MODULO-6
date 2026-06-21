const nodemailer = require("nodemailer")
require("dotenv").config()

const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 587,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
})

const sendEmail = async (to, subject, message) => {
    try {
        const emailOptions = {
            from: "noreply@ciccio.com",
            to,
            subject,
            html: message
        }

        return await transporter.sendMail(emailOptions)
    } catch (error) {
        console.error(e)
        throw new Error("Impossible to send email, an error occured")
    }
}

module.exports = sendEmail