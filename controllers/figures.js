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

function createRoute(req, res, next){
  req.body.createdBy = req.currentUser
  Figure.create(req.body)
    .then(figure => res.status(201).json(figure))
    .catch(next)
}

function updateRoute(req, res, next){
  Figure.findById(req.params.id)
    .then(figure => figure.set(req.body))
    .then(figure => figure.save())
    .then(figure => res.json(figure))
    .catch(next)
}

function deleteRoute(req, res, next){
  Figure.findById(req.params.id)
    .then(figure => figure.remove())
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute
}
