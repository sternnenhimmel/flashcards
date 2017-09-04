const express = require('express')
routes = express.Router()

routes.get('/error', (req, res, next) => {
    err = new Error("Error!")
    err.status = 500
    next(err)
})

routes.get('/', (req, res) => {
    res.render('index')
})

routes.get('/hello', (req, res) => {
    name = req.cookies.name
    if (name) {
        res.render('hello', { name })
    } else {
        res.render('hello')
    }
})

routes.post('/hello', (req, res) => {
    name = req.body.name
    res.cookie('name', name)
    res.redirect('/')
})

routes.get('/goodbye', (req, res) => {
    res.clearCookie('name')
    res.redirect('/hello')
})

routes.post('/login', (req, res) => {
    res.redirect('/hello')
})


module.exports = routes