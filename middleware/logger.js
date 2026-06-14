const logger = (req, res, next) => {
    console.log(`Metodo utilzizato: ${req.method} al router: ${req.url}`)
    next()
}

module.exports = logger