const express = require('express')
const router = express.Router()
const blogs = require('../controllers/blogs')

router.get('/', blogs.index)

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', blogs.create)

router.delete('/:id', blogs.delete)

module.exports = router
