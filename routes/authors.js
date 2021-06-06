const express = require('express')
const router = express.Router()
const Author = require('../models/author')

// all authors route based on serach query
router.get('/', async (req, res) => {
    let searchQuery = {}
    if (req.query.firstname != null && req.query.firstname !== '') {
        searchQuery.firstname = new RegExp(req.query.firstname, 'i')
    }
    try {
        const authors = await Author.find(searchQuery)
        res.render('authors/index', {
            authors: authors,
            searchQuery: req.query
        })
    } catch {

    }
})

// new authors route: display form to enter new authors info and pass the Author object
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() })
})

// create new authors: process authors new form to create a new record
router.post('/', async (req, res) => {
    const author = new Author({
        firstname: req.body.firstname,
        surname: req.body.surname
    })
    try {
        const newAuthor = await author.save()
        //res.redirect(`authors/${newAuthor.id}`)
        res.redirect('authors')
    } catch {
        res.render('authors/new', {
        author: author,
        errorMessage: 'Error creating Author'
      })
    }
})


module.exports = router