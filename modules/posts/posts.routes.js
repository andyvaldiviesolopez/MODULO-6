const express = require("express")
const posts = express.Router()
const postsController = require("./posts.controller")
const postValidateMiddleware = require("../../middleware/validatePost")
const { upload } = require("../../multer/index")
const { cloud } = require("../../multer/index")

posts.get("/posts", postsController.getPosts)
posts.get("/posts/:id", postsController.getPostById)

posts.post("/posts", [postValidateMiddleware], postsController.createPost)
posts.post(`/upload/posts/image`, upload.single("img"), postsController.uploadOnDisk)
posts.post(`/upload/posts/cloud`, cloud.single("img"), postsController.uploadFileOnCloud)

posts.patch("/posts/:id", postsController.updatePost)
posts.patch("/posts/:id/cover", cloud.single("img"), postsController.uploadFileOnCloud)

posts.delete("/posts/:id", postsController.deletePost)

module.exports = posts