const { initServer } = require("./config/database")
const express = require("express")
const PORT = 8099

const authorRoute = require("./modules/authors/authors.routes")
const postRoute = require("./modules/posts/posts.routes")
const artistRoute = require("./modules/artists/artists.routes")


const server = express()
server.use(express.json())

server.use("/", authorRoute)
server.use("/", postRoute)
server.use("/", artistRoute)

initServer(PORT, server)