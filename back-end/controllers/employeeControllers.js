const EmployeeModel = require("../models/EmployeeModel")

exports.getAllEmployees = (req, res, next) => {
  EmployeeModel.find()
    .then(employees => res.status(200).json(employees))
    .catch(error => res.status(404).json(error))
}