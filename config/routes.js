const router = require('express').Router()
const auth = require('../controllers/auth')
const figuresController = require('../controllers/figures')
const secureRoute = require('../lib/secureRoute')

router.get('/figures', figuresController.index)
router.post('/figures', figuresController.create)
router.get('/figures/:id', figuresController.show)
router.put('/figures/:id', figuresController.update)
router.delete('/figures/:id', figuresController.delete)

router.post('/register', auth.register)
router.post('/login', auth.login)

module.exports = router
