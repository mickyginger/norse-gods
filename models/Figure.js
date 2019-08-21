const mongoose = require('mongoose')


const figureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Please enter a name'
  },
  oldNorse: {
    type: String,
    required: 'Please enter the name in Old Norse'
  },
  associatedWith: {
    type: [],
    required: 'Please enter an association'
  },
  home: {
    type: String,
    required: 'Please enter a home'
  },
  image: {
    type: String,
    required: 'Please provide image URL'
  },
  mother: {
    type: mongoose.Schema.ObjectId,
    ref: 'Figure'
  },
  father: {
    type: mongoose.Schema.ObjectId,
    ref: 'Figure'
  }
}, {
  timestamps: true,
  toJSON: {
    transform(doc, json) {
      delete json.__v
      return json
    }
  }
})

module.exports = mongoose.model('Figure', figureSchema)
