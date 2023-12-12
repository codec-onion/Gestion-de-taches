const express = require("express")
const router = express.Router()
const userControllers = require("../controllers/userControllers")

// router.post("/user/signup", userControllers.signup)
router.post("/user/login", userControllers.login)

module.exports = router