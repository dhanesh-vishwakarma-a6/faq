const mongoose = require("mongoose")
const crypto = require("crypto")
const { v4: uuidv4 } = require("uuid")

// SCHEMAS
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        maxlength: 32,
        required: true,
        trim: true
    },

    lastName: {
        type: String,
        maxlength: 32,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    encry_password: {
        type: String,
        required: true
    }
}, { timestamps: true })

// VIRTUALS
userSchema.virtual("password")
    .set(function (password) {
        this._password = password
        this.salt = uuidv4()
        this.encry_password = this.securePassword(password)
    })
    .get(function () {
        return this._password
    })


userSchema.virtual("fullName")
    .get(function () { return `${this.firstName} ${this.lastName}` })


// METHODS
userSchema.method({
    // password authentication
    authenticate: function (plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password
    },

    // securing password
    securePassword: function (plainpassword) {
        if (!plainpassword) return ""

        try {
            return crypto
                .createHmac("sha256", this.salt)
                .update(plainpassword)
                .digest('hex')

        } catch (err) {
            return ""
        }
    }
})

// MODEL

let User = mongoose.model("User", userSchema)

// EXPORTS
module.exports = User