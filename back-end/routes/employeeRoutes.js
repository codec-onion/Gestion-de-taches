const express = require("express")
const router = express.Router()
const employeesController = require("../controllers/employeeControllers")

router.get("/employee", employeesController.getAllEmployees)

module.exports = router