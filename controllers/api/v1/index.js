const router = require('express').Router()

router.route('/').get((req, res) => res.send('/api/v1'))

module.exports = router
