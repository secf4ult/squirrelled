const router = require('express').Router()
const passport = require('passport')
const LocalStrategy = require('passport-local')
const debug = require('debug')('app:controllers:users')
const User = require('../../models/User')

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    (email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) done(err)
        if (user) {
          user.verifyPassword(password, (err2, isMatch) => {
            if (err2) done(err2, false)
            if (isMatch) done(null, user)
            else done(null, false)
          })
        } else {
          done(null, false, 'User not found')
        }
      })
    }
  )
)
passport.serializeUser((user, done) => {
  debug('serialized')
  done(null, user.id)
})
passport.deserializeUser((id, done) => {
  debug('deserialized')
  User.findById(id, (err, user) => done(err, user))
})

router.route('/login').post(
  passport.authenticate('local', {
    failWithError: true,
    failureRedirect: '/login'
  }),
  (req, res) => {
    if (req.user) res.send({ msg: 'User logged in' })
    else res.send({ msg: 'User not existed' })
  }
)

router.route('/register').post((req, res) => {
  const { email, username, password } = req.body

  // confirm email is not duplicated
  User.findOne({ email }, (err, user) => {
    if (err) res.send(err)
    if (user) res.send('User duplicated')
    else {
      const newUser = new User({
        email,
        username,
        password
      })
      newUser.register((err) => {
        if (err) res.send(err)
        res.send({ msg: 'User registered successfully' })
      })
    }
  })
})

router.route('/logout').post((req, res) => {
  req.logout()
  res.end()
})

module.exports = router
