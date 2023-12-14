const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const userControllers = require("../controllers/userControllers")

// router.post("/user/signup", userControllers.signup)
router.get("/user/logged", auth, userControllers.isLogged)
router.post("/user/login", userControllers.login)

module.exports = router