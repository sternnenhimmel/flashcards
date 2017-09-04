const express = require('express')
routes = express.Router()
const { data } = require('../data/flashcardData.json')
const { cards } = data

routes.get('/:id', (req, res) => {
    const { id } = req.params
    const { side } = req.query
    if (side === 'answer') {
        text = cards[id]['answer']
    } else {
        text = cards[id]['question']
    }
    cardData = { id, text }
    if (side === 'answer') {
        cardData.buttonUrl = 'question'
        cardData.buttonDisplay = 'question'
    } else {
        cardData.hint = cards[id]['hint']
        cardData.buttonUrl = 'answer'
        cardData.buttonDisplay = 'answer'
    }
    res.render('flashcard', cardData)
})

routes.get('/', (req, res) => {
    len = cards.length
    id = Math.floor(Math.random() * len)
    res.redirect('/cards/' + id)
})


module.exports = routes