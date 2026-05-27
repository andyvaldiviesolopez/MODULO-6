const { initServer } = require("./config/database")
const express = require("express")
const PORT = 8099

const authorRoute = require("./modules/authors/authors.routes")


const server = express()
server.use(express.json())

server.use("/", authorRoute)

initServer(PORT, server)