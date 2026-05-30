const express = require("express")
const posts = express.Router()
const postsController = require("./posts.controller")


posts.get("/posts", postsController.getPosts)
posts.get("/posts/:id", postsController.getPostById)

posts.post("/posts", postsController.createPost)

posts.patch("/posts/:id", postsController.updatePost)

posts.delete("/posts/:id", postsController.deletePost)

module.exports = posts