const mongoose = require("mongoose")

const artistSchema = new mongoose.Schema({

    artist: {
        type: String,
        required: true,
        unique: true,
        minLength: 2
    },
    genre: {
        type: String,
        required: false,
        default: "Genre not defined"
    }
}, { timestamps: true, strict: true })

module.exports = mongoose.model("artist", artistSchema, "artists")