const express = require("express")
const authors = express.Router()
const authorsController = require("./authors.controller")


authors.get("/authors", authorsController.getAuthors)
authors.get("/authors/:id", authorsController.getAuthorById)

authors.post("/authors", authorsController.createAuthor)

authors.patch("/authors/:id", authorsController.updateAuthor)

authors.delete("/authors/:id", authorsController.deleteAuthor)

module.exports = authors
