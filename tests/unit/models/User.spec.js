const should = require('chai').should()
const bcrypt = require('bcryptjs')
const User = require('../../../models/User')
const db = require('../../../db')

describe('User model', () => {
  let tuser

  beforeEach(() => {
    tuser = new User({
      email: 'test',
      username: 'test',
      password: 'test'
    })
  })
  afterEach((done) => {
    User.deleteMany({ email: 'test' }, () => {
      done()
    })
  })
  after((done) => db.close(done))

  it('exists', () => {
    User.should.exist
    User.should.equal(db.model('User'))
  })

  describe('Add user', function () {
    it('Add a new user', function (done) {
      tuser.save((err, user) => {
        user.validate().should.be.empty
        should.not.exist(err)
        should.exist(user)
        user.email.should.equal('test')
        user.username.should.equal('test')
        user.password.should.equal('test')
        done()
      })
    })

    it('Email is required', function (done) {
      tuser.email = null
      tuser.validate((err) => {
        should.exist(err)
        done()
      })
    })
    it('Password is required', function (done) {
      tuser.password = null
      tuser.validate((err) => {
        should.exist(err)
        done()
      })
    })
  })

  describe('User methods', () => {
    it('register', function (done) {
      tuser.register((err, user) => {
        should.not.exist(err)
        User.findOne({ email: 'test' }, (err, user) => {
          should.not.exist(err)
          user.username.should.equal('test')
          user.email.should.equal('test')
          done()
        })
      })
    })
    it('verify password', function (done) {
      tuser.register((err, user) => {
        should.not.exist(err)
        bcrypt.compare('test', user.password, (err, isMatch) => {
          should.not.exist(err)
          isMatch.should.be.true
          done()
        })
      })
    })
  })
})
