const mongoose = require("mongoose")

const initDatabaseConnectionString = "mongodb+srv://EpiBooks_Database:Metodo2026@epibooks.qzkkadr.mongodb.net/EpiBooks"

const getConnection = async () => {
    try {
        await mongoose.connect(initDatabaseConnectionString)
        console.log("Database connected successfully 🆗")
    } catch (error) {
        console.error("Cannot connect to the database ❌")
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