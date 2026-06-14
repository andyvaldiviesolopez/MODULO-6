const authorsService = require("./authors.service")
const sendMail = require("../email/index")

const getAuthors = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10

        const authors = await authorsService.getAuthors(
            page,
            limit
        )
        res.status(200)
            .send({
                statusCode: 200,
                page,
                limit,
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

        await sendMail("isobel57@ethereal.email","NEW AUTHOR CREATE",`porva`)
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

const updateAuthor = async (req, res) => {
    try {
        const updatedAuthor = await authorsService.updateAuthor(
            req.params.id,
            req.body
        )

        if (!updatedAuthor) {
            return res.status(404).send({
                statusCode: 404,
                message: "Author non trovato ❌"
            })
        }

        res.status(200).send({
            statusCode: 200,
            updatedAuthor
        })

    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Errore durante la modifica dell'autore ❌",
            error: error.message
        })
    }
}

const deleteAuthor = async (req, res) => {
    try {
        const deletedAuthor = await authorsService.deleteAuthor(
            req.params.id
        )

        if (!deletedAuthor) {
            return res.status(404).send({
                statusCode: 404,
                message: "Author non trovato ❌"
            })
        }

        res.status(200).send({
            statusCode: 200,
            message: "Author eliminato correttamente 🗑️",
            deletedAuthor
        })

    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Errore durante l'eliminazione dell'autore ❌",
            error: error.message
        })
    }
}

const uploadFileOnCloud = async (req, res, next) => {
    try {
        res.status(200)
            .json({
                statusCode: 200,
                img: req.file.path
            })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAuthors,
    createAuthor,
    getAuthorById,
    updateAuthor,
    deleteAuthor,
    uploadFileOnCloud
}