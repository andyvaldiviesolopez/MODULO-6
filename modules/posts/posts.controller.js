const postsService = require("./posts.service")

const getPosts = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10

        const posts = await postsService.getPosts(
            page,
            limit
        )

        res.status(200)
            .send({
                statusCode: 200,
                page,
                limit,
                posts
            })
    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: "❌ Errore durante la richiesta dei posts"
            })
    }
}

const getPostById = async (req, res) => {
    try {
        const postById = await postsService.getPostById(req.params.id)
        res.status(200)
            .send({
                statusCode: 200,
                postById
            })
    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: "❌ Errore durante la richiesta dei posts"
            })
    }
}

const createPost = async (req, res) => {
    try {
        const newPost = await postsService.createPost(req)
        res.status(201)
            .send({
                statusCode: 201,
                message: "🆗Post creato correttamente!",
                newPost
            })
    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: "❌ Errore durante la creazione del post"
            })
    }
}

const updatePost = async (req, res) => {
    try {
        const updatePost = await postsService.updatePost(req.params.id, req.body)

        if (!updatePost) {
            return res.status(404).send({
                statusCode: 404,
                message: "Post non trovato ❌"
            })
        }

        res.status(200)
            .send({
                statusCode: 200,
                message: "🆗 Post modificato correttamente!",
                updatePost
            })
    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: "❌ Errore durante la modifica del post"
            })
    }
}

const deletePost = async (req, res) => {
    try {
        const deletePost = await postsService.deletePost(req.params.id)

        if (!deletePost) {
            return res.status(404).send({
                statusCode: 404,
                message: "Post non trovato ❌"
            })
        }

        res.status(200)
            .send({
                statusCode: 200,
                message: "🆗 Post eliminato correttamente!",
                deletePost
            })
    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: "❌ Errore durante la cancellazione del post"
            })
    }
}

const uploadOnDisk = async (req, res, next) => {
    try {
        const url = `${req.protocol}: ${req.get("host")}`
        const name = req.file.filename

        res.status(200)
            .json({ img: `${url}/upload/${name}` })
    } catch (error) {
        next(e)
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
        next(e)
    }
}

module.exports = {
    getPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost,
    uploadOnDisk,
    uploadFileOnCloud
}