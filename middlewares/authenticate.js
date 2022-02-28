const expressJWT = require("express-jwt")
require("dotenv").config()

exports.isSignedIn = expressJWT({
    secret: process.env.SECRET,
    userProperty: "auth",
    algorithms: ["HS256"]
})

exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id
    if (!checker) return res.status(403).json({
        error: "ACCESS DENIED. User not authenticated"
    })
    next()
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) return res.status(403).json({
        error: "ACCESS DENIED. Admin access only"
    })
    next()
}
