const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mainRoutes = require('./routes')
const cardsRoutes = require('./routes/cards')

app = express()

app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
    console.log("One")
    next()
})

app.use(mainRoutes)
app.use('/cards', cardsRoutes)

app.use((req, res, next) => {
    err = new Error('Not Found')
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    res.locals.error = err
    res.status(err.status)
    res.render('error', { error: err })
})

var port = (process.env.VCAP_APP_PORT || 3000)
var host = (process.env.VCAP_APP_HOST || 'localhost')

app.listen(port, host)