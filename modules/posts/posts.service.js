const Posts = require("./posts.schema")
const Comments = require("../comments/comments.schema")

const getPosts = async (page, limit) => {
    const skip = (page - 1) * limit

    const posts = await Posts.find()
        .skip(skip)
        .limit(limit)

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
        content: req.body.content,
        comments: req.body.comments || []
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

const createCommentForPost = async (postId, comments) => {
    const post = await Posts.findById(postId)
    post.comments.push(comments)

    const commentUpdate = await post.save()
    return commentUpdate
}

const getCommentsOfPost = async (postId) => {
    const post = await Posts.findById(postId)
    const comments = post.comments
    return comments

}

const getCommentFromId = async (postId, commentId) => {
    const post = await Posts.findById(postId)
    const comment = post.comments.find(comment => comment._id.toString() === commentId)
    return comment
}

const updateCommentFromId = async (postId, commentId, body) => {
    const post = await Posts.findById(postId)
    const comment = post.comments.find(comment => comment._id.toString() === commentId)
    comment.rate = body.rate
    comment.comment = body.comment
    await post.save()
    return comment
}

const deleteCommentFromId = async (postId, commentId) => {
    const post = await Posts.findById(postId)
    const comment = post.comments.find(comment => comment._id.toString() === commentId)
    const deleteComment = post.comments.filter(comments => comments._id.toString() !== commentId)
    post.comments = deleteComment
    post.save()
    return post
}

module.exports = {
    getPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost,
    createCommentForPost,
    getCommentsOfPost,
    getCommentFromId,
    updateCommentFromId,
    deleteCommentFromId
}