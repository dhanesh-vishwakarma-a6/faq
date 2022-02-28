const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const logger = require("morgan")
require("dotenv").config()
require("./database")

const app = express()
const port = process.env.PORT

// MIDDLEWARES
app.use(logger("dev"))
app.use(cors())
app.use(cookieParser())
app.use(express.json())

// ROUTES
app.use("/api", require("./routes/auth"))


// SERVER
app.listen(port, () => (
    console.log(`SERVER: listening on port: ${port}`)
))