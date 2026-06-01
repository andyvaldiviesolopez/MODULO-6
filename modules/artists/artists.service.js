const Artist = require("./artists.schema")

const getArtist = async (page, limit) => {
    const skip = (page - 1) * limit

    const artist = await Artist.find()
        .skip(skip)
        .limit(limit)

    return artist
}

const getArtistById = async (id) => {
    const artistById = await Artist.findById(id)
    return artistById
}

const createArtist = async (req) => {
    const newArtist = await Artist.create({
        artist: req.body.artist,
        genre: req.body.genre
    })

    return newArtist
}

const updateArtist = async (id, body) => {
    const updatedArtist = await Artist.findByIdAndUpdate(id, body, {new: true})
    return updatedArtist
}

const deleteArtist = async (id) => {
    const eliminatedArtist = await Artist.findByIdAndDelete(id)
    return eliminatedArtist
}

module.exports = {
    getArtist,
    getArtistById,
    createArtist,
    updateArtist,
    deleteArtist
}