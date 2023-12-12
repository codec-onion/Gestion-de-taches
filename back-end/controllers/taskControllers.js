const TaskModel = require("../models/TaskModel")
const { checkTaskInfo } = require("../_utils/helpersCreateTask")
const { filterDateSameDay, checkTaskOverlap, checkTotalTaskTime } = require("../_utils/helpersAssignTask")

exports.getAllTasks = (req, res, next) => {
  TaskModel.find()
    .then(tasks => res.status(200).json(tasks))
    .catch(error => res.status(404).json(error))
}

exports.createTask = (req, res, next) => {
  const checkedTaskInfo = checkTaskInfo(req.body)
  if(checkedTaskInfo.length > 0) {
    return res.status(400).json({ message: checkedTaskInfo })
  }
  const task = new TaskModel({
    ...req.body,
    employeeId: []
  })
  task.save()
    .then(() => res.status(200).json({message: "Tâche créée avec succès."}))
    .catch((error) => res.status(404).json(error))
}

exports.assignTask = async (req, res, next) => {
  let taskAdd
  
  await TaskModel.findOne({ _id: req.body.taskId })
  .then(task => taskAdd = task)
  .catch(error => res.status(500).json(error))
  
  let assignedTasks

  await TaskModel.find({ employeeId: { $in: [req.body.employeeId] } })
  .then(tasks => {
    const taskAlreadyAssigned = tasks.find(task => task.id === req.body.taskId)
    if (!!taskAlreadyAssigned) {
      return res.status(403).json({message: "Cette tâche est déjà assignée à cet employé."})
    }
    assignedTasks = filterDateSameDay(tasks)
  })
  .catch(error => res.status(500).json(error))
  
  if (assignedTasks.length === 0) {
    if (!checkTotalTaskTime(assignedTasks, taskAdd)) {
      return res.status(403).json({ message: "vous ne pouvez pas assigner cette tâche à l'employé car cela dépasse les 8 heures de travail autorisé." })
    }

    taskAdd.employeeId.push(req.body.employeeId)
    TaskModel.updateOne({ _id: req.body.taskId }, { employeeId: taskAdd.employeeId })
      .then(() => res.status(200).json({ message: "Tâche assignée" }))
      .catch(error => res.status(500).json(error))
  } else {
    
  }
}
  
  exports.deleteTask = (req, res, next) => {
  TaskModel.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Tâche supprimée avec succès." }))
    .catch(error => res.status(500).json(error))
}