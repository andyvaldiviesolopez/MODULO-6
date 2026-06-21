console.log("AUTHORS ROUTES CARICATE")
const { initServer } = require("./config/database")
const express = require("express")
const path = require("path")
const cors = require("cors")
const PORT = 8099

const authors = require("./modules/authors/authors.routes")
const posts = require("./modules/posts/posts.routes")

const loggerMiddleware = require("./middleware/logger")
const errorHandler = require("./middleware/errorHandler")

const oauthRoute = require("./modules/oauth/oauth.route")

const server = express()
server.get("/", (req, res) => {
    res.send("SERVER OK")
})

server.use(express.json())

server.use(cors())
server.use("/upload", express.static(path.join(__dirname, "./upload")))

server.use(loggerMiddleware)
server.use((req, res, next) => {
    console.log("RICHIESTA ARRIVATA AL SERVER")
    next()
})
server.use((req, res, next) => {
    console.log(req.method, req.url)
    next()
})
server.use("/", authors)
server.use("/", posts)
server.use("/", oauthRoute)

server.use(errorHandler)

server.get("/pippo", (req, res) => {
    res.send("CIAO ANDY")
})
initServer(PORT, server)