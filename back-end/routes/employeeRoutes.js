const express = require("express")
const router = express.Router()
const employeesController = require("../controllers/employeeControllers")
const auth = require("../middleware/auth")

router.get("/employee", auth, employeesController.getAllEmployees)

module.exports = router