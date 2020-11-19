const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const debug = require('debug')('app:models:user')

// after benchmark this is found optimize2d
const SALT_ROUNDS = 10

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String },
  create_at: { type: Date, default: Date.now }
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
    bcrypt.hash(this.password, salt, (err2, hash) => {
      if (err2) cb(err2)
      this.password = hash
      this.save(cb)
    })
  })
}

module.exports = mongoose.model('User', UserSchema)
