const mongoose = require('mongoose')

const MovieGenreSchema = new mongoose.Schema({
  genre: String
})

module.exports = mongoose.model('MovieGenre', MovieGenreSchema)
