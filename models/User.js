const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const debug = require('debug')('app:models:user')
const Movie = require('./Movie')
const db = require('../db')

// after benchmark this is found optimized
const SALT_ROUNDS = 10

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String },
  register_date: { type: Date, default: Date.now },
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  albums: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }],
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }]
})

UserSchema.methods.verifyPassword = function (pswd, cb) {
  bcrypt.compare(pswd, this.password, (err, isMatch) => {
    cb(err, isMatch)
  })
}

UserSchema.methods.register = function (cb) {
  if (cb === 'undefined') cb = debug
  bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
    if (err) cb(err)
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) cb(err)
      this.password = hash
      this.save(cb)
    })
  })
}

module.exports = mongoose.model('User', UserSchema)
