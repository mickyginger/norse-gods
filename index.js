const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const router = require('./config/routes')

const { port, dbURI } = require('./config/environment')

const app = express()

mongoose.connect(dbURI, { useNewUrlParser: true })

// look for static files in the `dist` folder
// static files are files like index.html, images, fonts, styles etc...
app.use(express.static(`${__dirname}/dist`))
app.use(bodyParser.json())
app.use('/api', router)

app.listen(port, () => console.log('By Odin\'s Raven!'))

module.exports = app
