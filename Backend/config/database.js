const mongoose = require("mongoose")

const initDatabaseConnectionString = process.env.MONGODB_URI

const getConnection = async () => {
    try {
        await mongoose.connect(initDatabaseConnectionString)
        console.log("Database connected successfully 🆗")
    } catch (error) {
        console.error("Cannot connect to the database ❌")
        console.error(error)
    }
}

const initServer = async (port, server) => {
    getConnection()
    server.listen(port, () => {
        console.log(`Server up and connected on port ${port}`)
    })
}

module.exports = {
    initServer
}