const mongoose = require('mongoose')

const PeopleSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  age: Number,
  date_of_birth: Date,
  date_of_death: Date
})

module.exports = mongoose.model('Book', PeopleSchema)
