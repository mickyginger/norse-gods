const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
mongoose.Promise = require('bluebird')
const Figure = require('../models/Figure')
const User = require('../models/User')

mongoose.connect(dbURI, { useNewUrlParser: true })
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => {
    return User.create([{
      username: 'gabe',
      email: 'gabriel.naughton135@gmail.com',
      password: 'g',
      passwordConfirmation: 'g'
    }])
  })
  .then(users => {
    const [gabe] = users
    console.log(users)
    return Figure.create([{
      name: 'Odin',
      oldNorse: 'Óðinn',
      associatedWith: ['wisdom', 'healing', 'royalty', 'death', 'sorcery', 'frenzy'],
      home: 'Valhalla',
      image: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Odin%2C_der_G%C3%B6ttervater.jpg',
      createdBy: gabe
    }, {
      name: 'Vili',
      oldNorse: 'Vili',
      associatedWith: ['willpower', 'consciousness', 'touch'],
      home: 'Valhalla',
      image: 'https://i.pinimg.com/originals/35/82/a0/3582a0d7058ec1003ea0b3534a7d4d53.jpg',
      createdBy: gabe
    },{
      name: 'Freyja',
      oldNorse: 'Freyja',
      associatedWith: ['war', 'death', 'love', 'sex', 'beauty', 'fertility', 'gold'],
      home: 'Fólkvangr',
      image: 'https://www.ancient.eu/img/r/p/500x600/8090.jpg?v=1518775131',
      createdBy: gabe
    },
    {
      name: 'Loki',
      oldNorse: 'Loki',
      associatedWith: ['trickery', 'shapeshifting', 'cunning'],
      home: 'Jotunheim',
      image: 'https://amp.insider.com/images/5c266d2e01c0ea08cf2bcbd6-750-562.jpg',
      createdBy: gabe
    }
    ])
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close())
