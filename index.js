const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const router = require('./config/routes')

const { port, dbURI } = require('./config/environment')

const app = express()

mongoose.connect(dbURI, { useNewUrlParser: true })

app.use(bodyParser.json())
app.use('/api', router)

app.listen(port, () => console.log('By Odin\'s Raven!'))

module.exports = app
