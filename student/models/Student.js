const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String
})

const student = mongoose.model('Student', StudentSchema)

module.exports = student
