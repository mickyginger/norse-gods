const Figure = require('../models/Figure')

function indexRoute(req, res, next){
  Figure.find()
    .then(figures => res.json(figures))
    .catch(next)
}

function showRoute(req, res, next){
  Figure.findById(req.params.id)
    .then(figure => res.json(figure))
    .catch(next)
}


module.exports = {
  index: indexRoute,
  show: showRoute
}
