const router = require('express').Router()

router.route('/add').post((req, res) => {
  res.send('Add movie')
})

router.route('/:id').post((req, res) => {
  res.send(req.params.id)
})

module.exports = router
