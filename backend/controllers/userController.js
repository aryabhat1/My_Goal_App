const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

// @desc  Register
// @route POST /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please add all fields")
    }

    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error("User already exists")
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create User
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
        // res.status(400)
        // throw new Error("Invalid user data")
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }

    // res.json({ message: "Register User" })
})
// @desc  Authenticate
// @route POST /api/users/login
// @access Public

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    // Check for email
    const user = await User.findOne({ email })
    // Decrypt password

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
    // res.json({ message: "Login User" })
})

// @desc  Get user data
// @route GET /api/users/me
// @access Private

const getMe = asyncHandler(async (req, res) => {
    // const {id, name, email}= await User.findById(req.user.id)
    // res.json({ message: "User data display" })
    res.status(200).json(req.user)
})

// Generate JWT

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    })
}
// @desc  Register
// @route POST /api/users
// @access Public

// const registerUser = (req, res) => {
//     res.json({ message: "Register User" })
// }

module.exports = { registerUser, loginUser, getMe }
