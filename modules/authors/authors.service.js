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

const updateAuthor = async (id, body) => {
    const updatedAuthor = await authorSchema.findByIdAndUpdate(
        id,
        body,
        { new: true }
    )

    return updatedAuthor
}

const deleteAuthor = async (id) => {
    const deletedAuthor = await authorSchema.findByIdAndDelete(id)

    return deletedAuthor
}

module.exports = {
    getAuthors,
    createAuthor,
    getAuthorById,
    updateAuthor,
    deleteAuthor
}