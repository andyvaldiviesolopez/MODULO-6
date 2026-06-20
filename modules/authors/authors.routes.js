const express = require("express")
const authors = express.Router()
const authorsController = require("./authors.controller")
const validateAuthorMiddleware = require("../../middleware/validateAuthor")
const auth = require("../../middleware/authorization")
const { cloud } = require("../../multer/index")

authors.get("/authors",auth, authorsController.getAuthors)
authors.get("/authors/:id",auth, authorsController.getAuthorById)
authors.get("/me", auth, authorsController.me)

authors.post("/authors", validateAuthorMiddleware, authorsController.createAuthor)
authors.post("/login", authorsController.login)

authors.patch("/authors/:id",auth, authorsController.updateAuthor)
authors.patch("/authors/:id/avatar",auth, cloud.single("img"), authorsController.uploadFileOnCloud)

authors.delete("/authors/:id",auth, authorsController.deleteAuthor)

module.exports = authors
