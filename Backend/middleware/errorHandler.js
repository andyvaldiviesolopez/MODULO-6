const errorHandler = (err, req, res, next) => {
    console.log(err)

    res.status(err.status || 500)
        .send({
            message: err.message || "Errore generico nel server"
        })
}

module.exports = errorHandler