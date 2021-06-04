const express = require('express')
const router = express.Router()

// all authors route
router.get('/', (req, res) => {
    res.render('authors/index')
})

// new authors route: display form to enter new authors info
router.get('/new', (req, res) => {
    res.render('authors/new')
})

// create new authors: process authors new form to create a new record
router.post('/', (req, res) => {
    res.send('new authors info registered')
})

module.exports = router