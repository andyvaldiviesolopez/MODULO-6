const mongoose = require("mongoose")
const commentSchema = require("../comments/comments.schema")

const postSchema = new mongoose.Schema({
    category: {
        type: String,
        required: false,
        default: "uncategorized"
    },
    title: {
        type: String,
        required: true,
        minLength: 1
    },
    cover: {
        type: String,
        required: false,
        default: "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
    },
    readtime: {
        value: {
            type: Number,
            required: false,
            default: 1
        },
        unit: {
            type: String,
            required: false,
            default: "1 min"
        }
    },
    author:
    {
        type: String,
        required: true,
        default: "Unknown"
    },
    content: {
        type: String,
        required: true,
        default: "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
    },
    comments: [commentSchema]
}, { timestamps: true, strict: true })


module.exports = mongoose.model("post", postSchema, "posts")