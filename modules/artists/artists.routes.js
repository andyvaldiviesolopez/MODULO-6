const express = require("express")
const artists = express.Router()
const artistsController = require("./artists.controller")

artists.get("/artists", artistsController.getArtists)
artists.get("/artists/:id", artistsController.getArtistById)

artists.post("/artists", artistsController.createArtist)

artists.patch("/artists/:id", artistsController.updateArtist)

artists.delete("/artists/:id", artistsController.deleteArtist)


module.exports = artists