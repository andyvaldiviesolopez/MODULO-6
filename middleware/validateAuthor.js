const validateAuthor = (req, res, next) => {

    const { firstName, lastName, email, password } = req.body

    if (!firstName || !lastName || !email || !password) {
        return res.status(500)
            .send({
                statusCode: 500,
                message: "Inserire tutti i dati obbligatori"
            })
    }

    next()
}

module.exports = validateAuthor
