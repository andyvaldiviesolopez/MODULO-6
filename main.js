const { initServer } = require("./config/database")
const express = require("express")
const path = require("path")
const cors = require("cors")
const PORT = 8099

const authors = require("./modules/authors/authors.routes")
const posts = require("./modules/posts/posts.routes")

const loggerMiddleware = require("./middleware/logger")
const errorHandler = require("./middleware/errorHandler")

const server = express()

server.use(express.json())

server.use(cors())
server.use("/upload", express.static(path.join(__dirname, "./upload")))

server.use(loggerMiddleware)

server.use("/", authors)
server.use("/", posts)

server.use(errorHandler)

initServer(PORT, server)