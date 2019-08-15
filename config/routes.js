const router = require('express').Router()
const auth = require('../controllers/auth')
const figuresController = require('../controllers/figures')

router.get('/figures', figuresController.index)

router.get('/figures/:id', figuresController.show)

router.post('/register', auth.register)
router.post('/login', auth.login)

module.exports = router
