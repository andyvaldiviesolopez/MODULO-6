const authorSchema = require("./authors.schema")

const getAuthors = async () => {
    const authors = await authorSchema.find()
    return authors
}

const createAuthor = async (req) => {
    const newAuthor = await authorSchema.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthday: req.body.birthday,
        avatar: req.body.avatar
    })

    return newAuthor
}

const getAuthorById = async (id) => {
    return await authorSchema.findById(id)
}


module.exports = {
    getAuthors,
    createAuthor,
    getAuthorById
}