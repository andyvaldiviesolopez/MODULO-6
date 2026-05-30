const postsService = require("./posts.service")

const getPosts = async (req, res) => {
    try {
        const posts = await postsService.getPosts()
        res.status(200)
            .send({
                statusCode: 200,
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
        const updatePost = await postsService.updatePost(req.params.id,req.body)

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

module.exports = {
    getPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost
}