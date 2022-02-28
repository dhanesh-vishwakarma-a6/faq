const User = require("../models/user")
const { validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
require("dotenv").config()

// REGISTER
exports.register = (req, res) => {
    // collecting errors
    const error = validationResult(req)
    if (!error.isEmpty()) return res.status(422).json({
        error: error.array()[0].msg
    })

    // creating user
    const user = new User(req.body)
    user.save((err, user) => {
        if (err) return res.status(400).json({
            message: "Not able to save user in Database"
        })

        // success response
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        })
    })
}

// LOGIN
exports.login = (req, res) => {
    // collecting errors
    const error = validationResult(req)
    if (!error.isEmpty()) return res.status(422).json({
        error: error.array()[0].msg
    })

    const { email, password } = req.body
    User.findOne({ email }, (err, user) => {
        // user authentication
        if (err || !user) return res.status(400).json({
            error: "user email doesn't exists"
        })
        if (!user.authenticate(password)) return res.status(401).json({
            error: "user password don't match"
        })

        // user sign in
        const token = jwt.sign({ _id: user._id }, process.env.SECRET)
        res.cookie("token", token, { expire: new Date() + 9999 })

        const { _id, name, email, role } = user
        res.json({
            token: token,
            user: { name, email, _id, role }
        })
    })
}

// LOGOUT
exports.logout = (req, res) => {
    res.clearCookie("token")
    res.json({
        message: "user logout successfully"
    })
}