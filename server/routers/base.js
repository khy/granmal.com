var router = require('express').Router()

router.get('/', (req, res) => {
  res.render('appBase', { key: 'index', title: 'Gran Mal' })
})

module.exports = router
