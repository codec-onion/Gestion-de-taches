const TaskModel = require("../models/TaskModel")
const EmployeeModel = require("../models/EmployeeModel")
const { checkTaskInfo } = require("../_utils/createTaskHelpers")
const { filterDateSameDay, checkTaskOverlap, checkTotalTaskTime } = require("../_utils/assignTaskHelpers")

exports.getAllTasks = (req, res, next) => {
  TaskModel.find()
    .then(tasks => res.status(200).json(tasks))
    .catch(error => res.status(500).json(error))
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
    .then(() => res.status(201).json({message: "Tâche créée avec succès."}))
    .catch((error) => res.status(500).json(error))
}

exports.assignTask = async (req, res, next) => {

  try {
    const employeeId = req.body.employeeId
    const taskId = req.body.taskId
    
    await EmployeeModel.findOne({ _id: employeeId })

    const taskToBeAdded = await TaskModel.findOne({ _id: taskId })
    const assignedTasks = await TaskModel.find({ employeeId: { $in: employeeId } })

    const taskAlreadyAssigned = assignedTasks.find(task => task.id === taskToBeAdded.id)
    if (!!taskAlreadyAssigned) {
      return res.status(403).json({ message: "Cette tâche est déjà assignée à cet employé." })
    }

    const assignedTasksSameDay = filterDateSameDay(assignedTasks, taskToBeAdded)
    const checkedTaskOverlap = checkTaskOverlap(assignedTasksSameDay, taskToBeAdded)
    const checkedTotalTaskTime = checkTotalTaskTime(assignedTasksSameDay, taskToBeAdded)

    if (!checkedTaskOverlap.isValid) {
      return res.status(403).json({ message: checkedTaskOverlap.errorMsg })
    } 
    if (!checkedTotalTaskTime) {
      return res.status(403).json({ 
        message: "Vous ne pouvez pas assigner cette tâche à l'employé car cela dépasse le temps autorisé par jour de 8h." 
      })
    }

    taskToBeAdded.employeeId.push(employeeId)
    
    await TaskModel.updateOne({ _id: taskId }, { employeeId: taskToBeAdded.employeeId })
    return res.status(200).json({ message: "Tâche assignée." })
  } catch (error) {
    if(!!error.model) {
      return res.status(400).json({ message: "Employé ou tâche introuvable." })
    }
    return res.status(500).json(error)
  }
}
  
  exports.deleteTask = (req, res, next) => {
  TaskModel.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Tâche supprimée avec succès." }))
    .catch(error => res.status(500).json(error))
}