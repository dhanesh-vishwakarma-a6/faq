const { check, body } = require("express-validator")

// VALIDATORS
exports.registerValidator = [
    check("firstName").isLength({ min: 3 }).withMessage("Name must be at least 3 char long"),
    check("password", "Password must be 8 char long").isLength({ min: 8 })
]

exports.loginValidator = [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 8 })
]