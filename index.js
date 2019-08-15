const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose.connect('mongodb://localhost:27017/norse-gods')

app.get('/', (req, res) => res.json({ message: 'Hello Odin!' }))

app.listen(4000, () => console.log('By Odin\'s Raven!'))
