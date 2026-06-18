const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    rate: {
        type: mongoose.Schema.Types.Int32,
        required: false,
        default: 1
    },
    comment: {
        type: String,
        required: true,
    }
}, { timestamps: true, strict: true })

module.exports = commentSchema