const mongoose = require('mongoose')

const taskShema = mongoose.Schema({
    wording: { type: String, required: true},
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    employeeId: { type: [String], required: true },
})

module.exports = mongoose.model("Task", taskShema)