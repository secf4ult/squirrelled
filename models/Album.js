const mongoose = require('mongoose')

const AlbumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'People' }
})

module.exports = mongoose.model('Album', AlbumSchema)
