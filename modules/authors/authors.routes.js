const express = require("express")
const authors = express.Router()
const authorsController = require("./authors.controller")
const validateAuthorMiddleware = require("../../middleware/validateAuthor")
const { cloud } = require("../../multer/index")

authors.get("/authors", authorsController.getAuthors)
authors.get("/authors/:id", authorsController.getAuthorById)

authors.post("/authors", [validateAuthorMiddleware], authorsController.createAuthor)

authors.patch("/authors/:id", authorsController.updateAuthor)
authors.patch("/authors/:id/avatar", cloud.single("img"), authorsController.uploadFileOnCloud)

authors.delete("/authors/:id", authorsController.deleteAuthor)

module.exports = authors
