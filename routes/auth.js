const express = require("express")
const router = express.Router()
const { registerValidator, loginValidator } = require("../middlewares/validate")
const { register, login, logout } = require("../controllers/auth")

router.get("/", (req, res) => res.send("Welcome Home from EXPRESS"))
router.post("/register", registerValidator, register)
router.post("/login", loginValidator, login)
router.get("/logout", logout)

module.exports = router