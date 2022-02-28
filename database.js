const mongoose = require("mongoose")
require("dotenv").config()

// OPTOINS
const uri = process.env.LOCAL_DB_URI
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(uri, options)
    .then(() => console.log("DATABASE CONNECTED"))
    .catch((err) => {
        console.error(`DATABASE ERROR: ${err.message}`)
        process.exit(1)
    })