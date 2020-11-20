const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
  // film metadata
  title: String,
  imdb_id: String,
  douban_id: String,
  homepage: String,
  overview: String,
  status: String,
  genres: [Object],
  runtime: String,
  release_date: Date,
  revenue: Integer,
  budget: Integer,

  production_companies: [Object],
  production_countries: [Object],
  // cast
  director: [{ type: mongoose.Schema.Types.ObjectId, ref: 'People' }],
  writer: [{ type: mongoose.Schema.Types.ObjectId, ref: 'People' }],
  actor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'People' }]
})

module.exports = mongoose.model('Movie', MovieSchema)
