const authorSchema = require("./authors.schema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const getAuthors = async (page, limit) => {
    const skip = (page - 1) * limit

    const authors = await authorSchema.find()
        .skip(skip)
        .limit(limit)
    return authors
}

const createAuthor = async (req) => {

    const hashedPassword =
        await bcrypt.hash(
            req.body.password,
            10
        )

    const newAuthor = await authorSchema.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
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

const login = async (email, password) => {

    const author = await authorSchema.findOne({ email })

    if (!author) {
        throw new Error("Email non trovata")
    }

    const passwordMatch =
        await bcrypt.compare(
            password,
            author.password
        )

    if (!passwordMatch) {
        throw new Error("Password errata")
    }

    const token = jwt.sign(
        {
            id: author._id,
            email: author.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    )

    return token
}

const me = async (id) => {
    return await authorSchema.findById(id)
}

module.exports = {
    getAuthors,
    createAuthor,
    getAuthorById,
    updateAuthor,
    deleteAuthor,
    login,
    me
}