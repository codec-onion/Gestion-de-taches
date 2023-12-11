const mongoose = require('mongoose')

const employeeShema = mongoose.Schema({
    firstName: { type: String, required: true, unique: true },
    lastName: { type: String, required: true }
})

module.exports = mongoose.model("Employee", employeeShema)