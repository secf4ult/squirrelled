const router = require('express').Router()

router.route('/').get((req, res) => res.send('/api'))

module.exports = router
