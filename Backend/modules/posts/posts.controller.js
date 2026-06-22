const postsService = require("./posts.service")
const Comment = require("../comments/comments.schema")

const getPosts = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10

        const posts = await postsService.getPosts(
            page,
            limit,
            req.query.title
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

const getMyPosts = async (req, res) => {
    try {
        console.log("USER:", req.user)
        const posts = await postsService.getMyPosts(
            req.user.id
        )
        console.log("TIPO:", typeof posts)
        console.log("ARRAY?", Array.isArray(posts))
        console.log("VALORE:", posts)
        res.status(200).send({
            statusCode: 200,
            posts
        })

    } catch (error) {

        res.status(500).send({
            statusCode: 500,
            message: error.message
        })

    }
}

const createPost = async (req, res) => {
    console.log("SONO NEL CONTROLLER")
    try {
        const newPost = await postsService.createPost(req)
        res.status(201)
            .send({
                statusCode: 201,
                message: "🆗Post creato correttamente!",
                newPost
            })
    } catch (error) {
        console.error("CREATE POST ERROR");
        console.error(error);

        res.status(500).send({
            statusCode: 500,
            message: error.message
        });
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
        const post = await postsService.getPostById(
            req.params.id
        )
        if (!post) {
            return res.status(404).send({
                statusCode: 404,
                message: "Post non trovato ❌"
            })
        }
        if (
            post.author.toString() !== req.user.id
        ) {
            return res.status(403).send({
                statusCode: 403,
                message: "Non autorizzato ❌"
            })
        }
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

const createCommentForPost = async (req, res) => {
    try {
        const newComment = await postsService.createCommentForPost(req.params.id, req.body)
        if (!newComment) {
            res.status(500)
                .send({
                    statusCode: 500,
                    message: "Errore durante la creazione del nuovo commento"
                })
        }

        res.status(200)
            .send({
                statusCode: 200,
                message: "Commento nuovo creato! ✅",
                newComment
            })

    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: error
            })
        console.log(error)
    }
}

const getCommentsOfPost = async (req, res) => {
    try {
        const comments = await postsService.getCommentsOfPost(req.params.id)

        if (!comments) {
            console.log("Commenti non trovati ❌")
            return res.status(404)
                .send({
                    statusCode: 404,
                    message: "Commenti non trovati ❌"
                })

        }

        res.status(200)
            .send({
                statusCode: 200,
                message: `Commenti del post ${req.params.id} in arrivo!`,
                comments
            })

    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: "Errore tecnico, controlla la console!"
            })
        console.error(error)
    }
}

const getCommentFromId = async (req, res) => {
    try {
        const comment = await postsService.getCommentFromId(req.params.postId, req.params.commentId)
        if (!comment) {
            return res.status(404)
                .send({
                    statusCode: 404,
                    message: "Commento non trovato ❌"
                })
        }

        res.status(200)
            .send({
                statusCode: 200,
                message: "Commento localizzato 🆗",
                comment
            })
    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: "Errore tecnico, visualizzare la console"
            })
        console.error(error)
    }
}

const updateCommentFromId = async (req, res) => {
    try {
        const updatedComment = await postsService.updateCommentFromId(req.params.postId, req.params.commentId, req.body)
        if (!updatedComment) {
            return res.status(404)
                .send({
                    statusCode: 404,
                    message: "Commento non trovato ❌"
                })
        }

        res.status(200)
            .send({
                statusCode: 200,
                message: "Commento aggiornato con successo 🆗✅",
                updatedComment
            })

    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: "Errore tecnico, visualizzare la console"
            })
        console.error(error)
    }
}

const deleteCommentFromId = async (req, res) => {
    try {
        const comment = await postsService.deleteCommentFromId(req.params.postId, req.params.commentId)
        if (!comment) {
            return res.status(404)
                .send({
                    statusCode: 404,
                    message: "Commento non trovato ❌"
                })
        }

        res.status(200)
            .send({
                statusCode: 200,
                message: "Commento eliminato con successo 🆗❌",
                comment
            })

    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: "Errore tecnico, visualizzare la console"
            })
        console.error(error)
    }
}

module.exports = {
    getPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost,
    uploadOnDisk,
    uploadFileOnCloud,
    createCommentForPost,
    getCommentsOfPost,
    getCommentFromId,
    updateCommentFromId,
    deleteCommentFromId,
    getMyPosts
}