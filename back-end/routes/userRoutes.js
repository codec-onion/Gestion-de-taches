const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const userControllers = require("../controllers/userControllers")

router.post("/user/signup", userControllers.signup)
router.post("/user/login", userControllers.login)
router.get("/user/logged", auth, userControllers.isLogged)

module.exports = router