const mongoose = require("mongoose")

const AuthorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 100,
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    birthday: {
        type: String,
        required: false,
        default: "Da definire"
    },
    avatar: {
        type: String,
        required: false
    }
}, { timestamps: true, strict: true })

module.exports = mongoose.model("author", AuthorSchema, "authors")