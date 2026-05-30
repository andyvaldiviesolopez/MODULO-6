const Posts = require("./posts.schema")

const getPosts = async () => {
    const posts = await Posts.find()
    return posts
}

const getPostById = async (id) => {
    const postById = await Posts.findById(id)
    return postById
}

const createPost = async (req) => {
    const newPost = await Posts.create({
        category: req.body.category,
        title: req.body.title,
        cover: req.body.cover,
        readtime: {
            value: req.body.readtime?.value || 1,
            unit: req.body.readtime?.unit || "1 min"
        },
        author: req.body.author,
        content: req.body.content
    })

    return newPost
}

const updatePost = async (id, body) => {
    const updatePost = await Posts.findByIdAndUpdate(id, body, { new: true })
    return updatePost
}

const deletePost = async (id) => {
    const deletePost = await Posts.findByIdAndDelete(id)
    return deletePost
}

module.exports = {
    getPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost
}