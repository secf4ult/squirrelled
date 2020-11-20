const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: { type: mongoose.Schema.Types.ObjectId, ref: 'People' },
  release_date: Date
})

module.exports = mongoose.model('Game', GameSchema)
