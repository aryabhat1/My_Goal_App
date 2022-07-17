// const { parse } = require("dotenv")
const path = require('path')
const express = require("express")
const colors = require("colors")
const { errorHandler } = require("./middleware/errorMiddleware")
const connectDB = require("./config/dbConnection")

const dotenv = require("dotenv").config()
const PORT = process.env.PORT

const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/goals", require("./routes/goalRoutes"))
app.use("/api/users", require("./routes/userRoutes"))

app.use(errorHandler)

app.listen(PORT, () => console.log(`Express Server running on Port: ${PORT} `))
