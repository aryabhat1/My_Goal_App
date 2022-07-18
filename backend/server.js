// const { parse } = require("dotenv")
const path = require("path")
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

// Serve frontend
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")))

    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname, "../", "frontend", "build", "index.html"))
    )
} else {
    app.get("/", (req, res) => res.send("Please set to production"))
}

app.use(errorHandler)

app.listen(PORT, () => console.log(`Express Server running on Port: ${PORT} `))
