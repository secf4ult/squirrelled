const router = require('express').Router()
const mongoose = require('mongoose')

router.use((req, res) => {
  if (!req.user) res.status(401).send({ msg: 'Please login first' })
})

router.route('/add').post((req, res) => {
  const cuser = req.user
  const { movie_id } = req.body
  User.findById(user.id, (err, fuser) => {
    fuser.movies.push(movie_id)
    fuser.save((err) => {
      if (err) res.send({ msg: 'Save failed' })
    })
  })
})

router
  .route('/:id')
  .get((req, res) => {
    const movie_id = req.params.id
    mongoose.model('Movie').findById(id, (err, fmovie) => {
      if (err) res.send({ msg: 'Movie not found' })
      res.send(fmovie)
    })
  })
  .update((req, res) => {
    const movie_id = req.params.id
    const newData = req.body
    mongoose.model('Movie').findById(id, (err, fmovie) => {
      if (err) res.send({ msg: 'Movie not found' })
      fmovie.update(newData, (err, umovie) => {
        if (err) res.send({ msg: 'Movie update failed' })
        res.send(umovie)
      })
    })
  })

module.exports = router
