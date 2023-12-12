const express = require("express")
const router = express.Router()
const taskControllers = require("../controllers/taskControllers")

router.get("/task", taskControllers.getAllTasks)
router.post("/task", taskControllers.createTask)
router.put("/task/assign", taskControllers.assignTask)

module.exports = router