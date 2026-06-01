const artistService = require("./artists.service")

const getArtists = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10

        const artist = await artistService.getArtist(
            page,
            limit
        )

        res.status(200)
            .send({
                statusCode: 200,
                message: "🆗 Artisti in arrivo!",
                artist,
                page,
                limit
            })
    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: "❌ Errore durante la richiesta degli artisti"
            }
            )
    }
}

const getArtistById = async (req, res) => {
    try {
        const artistById = await artistService.getArtistById(req.params.id)

        res.status(200)
            .send({
                statusCode: 200,
                message: "🆗 Artista trovato!",
                artistById
            })
    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: "❌ Errore durante la richiesta dell'artista"
            }
            )
    }
}

const createArtist = async (req, res) => {
    try {
        const newArtist = await artistService.createArtist(req)
        res.status(201)
            .send({
                statusCode: 201,
                message: "🆗 Artista creato correttamente!",
                newArtist
            })
    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: "❌ Errore durante la crezione dell'artista"
            }
            )
    }
}

const updateArtist = async (req, res) => {
    try {
        const updateArtist = await artistService.updateArtist(req.params.id, req.body)
        res.status(200)
            .send({
                statusCode: 200,
                message: "🆗 Artista aggiornato correttamente!",
                updateArtist
            })
    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: "❌ Errore durante l'aggiornamento dell'artista"
            }
            )
    }
}

const deleteArtist = async (req, res) => {
    try {
        const deleteArtist = await artistService.deleteArtist(req.params.id)
        res.status(200)
            .send({
                statusCode: 200,
                message: "🆗 Artista eliminato correttamente!",
                deleteArtist
            })
    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: "❌ Errore durante la cancellazione dell'artista"
            }
            )
    }
}


module.exports = {
    getArtists,
    getArtistById,
    createArtist,
    updateArtist,
    deleteArtist
}