const express = require("express")
const posts = express.Router()
const postsController = require("./posts.controller")
const postValidateMiddleware = require("../../middleware/validatePost")
const { upload } = require("../../multer/index")
const { cloud } = require("../../multer/index")
const auth = require("../../middleware/authorization")

posts.get("/posts", postsController.getPosts)
posts.get("/posts/me", auth, postsController.getMyPosts)
posts.get("/posts/:id", postsController.getPostById)
posts.get("/posts/:id/comments", postsController.getCommentsOfPost)
posts.get("/posts/:postId/comments/:commentId", postsController.getCommentFromId)

posts.post("/posts", [auth,postValidateMiddleware], postsController.createPost)
posts.post(`/upload/posts/image`, upload.single("img"), postsController.uploadOnDisk)
posts.post(`/upload/posts/cloud`, cloud.single("img"), postsController.uploadFileOnCloud)
posts.post("/posts/:id", postsController.createCommentForPost)

posts.patch("/posts/:id", postsController.updatePost)
posts.patch("/posts/:id/cover", cloud.single("img"), postsController.uploadFileOnCloud)
posts.patch("/posts/:postId/comments/:commentId", postsController.updateCommentFromId)

posts.delete("/posts/:id", auth, postsController.deletePost)
posts.delete("/posts/:postId/comments/:commentId", postsController.deleteCommentFromId)

module.exports = posts