const Employee = require("../models/Employee")

exports.test = (req, res, next) => {
    const idList = ["65774163c53eac98b6849b17", "65774212c53eac98b6849b19", "65774238c53eac98b6849b1a"]
    Employee.find({ _id: { $in: idList } })
      .then(employees => res.status(200).json({ employees }))
      .catch(error => res.status(404).json({ error }))
}
