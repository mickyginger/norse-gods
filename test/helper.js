process.env.NODE_ENV = 'test'
process.env.PORT = 4001

const chai = require('chai')
global.expect = chai.expect

const supertest = require('supertest')
const app = require('../index')
global.api = supertest(app)
