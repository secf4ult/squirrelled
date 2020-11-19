const router = require('express').Router()

function checkDebugId(req, res, next) {
  if (req.query.debug_id === '123456') next()
  else res.send({ msg: 'debug id required' })
}

router.use(checkDebugId)

router.get('/ping', (req, res) => {
  if (req.session.views) {
    req.session.views++
  } else {
    req.session.views = 1
  }
  res.send({ views: req.session.views, user: req.user })
})

module.exports = router
