const fs = require('fs')
const router = require('express').Router()
const debug = require('debug')('app:controllers:index')

// auto load other controllers
fs.readdirSync(__dirname).forEach((symbol) => {
  if (symbol.endsWith('js')) {
    // js file
    if (symbol !== 'index.js') {
      router.use(`/${symbol.slice(0, -3)}`, require(`./${symbol}`))
    }
  } else {
    // dir
    router.use(`/${symbol}`, require(`./${symbol}`))
  }
})

module.exports = router
