const path = require('path')
const express = require('express')
const session = require('express-session')
const debug = require('debug')('app')
const morgan = require('morgan')
const passport = require('passport')

// load .env file into environment variables
require('dotenv').config()

const router = require('./controllers')
const db = require('./db')

const app = express()

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(
  session({
    resave: false,
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    cookie: {
      maxAge: Number.parseInt(process.env.SESSION_MAX_AGE) || 86400
    }
    // store: db
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'dist')))

// error handler
app.use((err, req, res, next) => {
  debug('App error:', err)
})

// load routers
app.use(router)

module.exports = app
