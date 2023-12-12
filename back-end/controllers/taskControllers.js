const TaskModel = require("../models/TaskModel")

exports.getAllTasks = (req, res, next) => {
  TaskModel.find()
    .then(tasks => res.status(200).json(tasks))
    .catch(error => res.status(404).json(error))
}

exports.createTask = (req, res, next) => {
  const resBody = req.body
  const task = new TaskModel({
    ...resBody,
    employeeId: []
  })
  task.save()
    .then(() => res.status(200).json({message: "Tâche créée avec succès.", ...req.body}))
    .catch(() => res.status(404).json({message: "coucou"}))
}

exports.assignTask = (req, res, next) => {
  
}