const authorsService = require("./authors.service")

const getAuthors = async (req, res) => {
    try {
        const authors = await authorsService.getAuthors()
        res.status(200)
            .send({
                statusCode: 200,
                authors
            })
    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: "Errore durante la chiamata al db ❌"
            })
    }
}

const getAuthorById = async (req, res) => {
    try {
        const author = await authorsService.getAuthorById(req.params.id)

        res.status(200).send({
            statusCode: 200,
            author
        })

    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Errore durante la chiamata al db ❌",
            error: error.message
        })
    }
}

const createAuthor = async (req, res) => {
    try {
        const newAuthor = await authorsService.createAuthor(req)
        res.status(201)
            .send({
                statusCode: 201,
                newAuthor
            })
    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: "Errore durante la chiamata al db ❌",
                error: error.message
            })
    }
}

module.exports = {
    getAuthors,
    createAuthor,
    getAuthorById
}