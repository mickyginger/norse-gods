const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
mongoose.Promise = require('bluebird')
const Figure = require('../models/Figure')

mongoose.connect(dbURI, { useNewUrlParser: true })
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => {
    return Figure.create([{
      name: 'Odin',
      oldNorse: 'Óðinn',
      associatedWith: ['wisdom', 'healing', 'royalty', 'death', 'sorcery', 'frenzy'],
      home: 'Valhalla'
    }, {
      name: 'Vili',
      oldNorse: 'Vili',
      associatedWith: ['willpower', 'consciousness', 'touch'],
      home: 'Valhalla'
    },{
      name: 'Freyja',
      oldNorse: 'Freyja',
      associatedWith: ['war', 'death', 'love', 'sex', 'beauty', 'fertility', 'gold'],
      home: 'Fólkvangr'
    },
    {
      name: 'Loki',
      oldNorse: 'Loki',
      associatedWith: ['trickery', 'shapeshifting', 'cunning'],
      home: 'Jotunheim'
    }])
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close())
