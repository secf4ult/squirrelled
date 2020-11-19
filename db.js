const mongoose = require('mongoose')
const debug = require('debug')('app:database')

const mongodbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(process.env.MONGODB_URI, mongodbOptions)

const db = mongoose.connection
db.once('connected', () => debug('database connected'))
db.on('error', (err) => debug(err))

module.exports = db
