const express = require("express")
const router = express.Router()
const taskControllers = require("../controllers/taskControllers")
const auth = require("../middleware/auth")

router.get("/task", auth, taskControllers.getAllTasks)
router.post("/task", auth, taskControllers.createTask)
router.put("/task/assign", auth, taskControllers.assignTask)
router.delete("/task/:id", auth, taskControllers.deleteTask)

module.exports = router