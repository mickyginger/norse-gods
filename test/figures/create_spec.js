/* global api, describe, it, expect, afterEach */
const Figure = require('../../models/Figure')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')

const figureData = require('../../db/data/figures')[0]

const userData = {
  username: 'test',
  email: 'test@test.test',
  password: 'test',
  passwordConfirmation: 'test'
}

describe('POST /figures', () => {


  let figure, token

  beforeEach(done => {
    User.create(userData)
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' })

        return Figure.create(figureData)
      })
      .then(figures => {
        figure = figures[0]
        done()
      })
  })

  afterEach(done => {
    User.remove({})
      .then(() => Figure.remove({}))
      .then(() => done())
  })

  it('should return a 401 response', done => {
    api
      .post('/api/figures')
      .send(figureData)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 201 response with a token', done => {
    api
      .post('/api/figures')
      .set('Authorization', `Bearer ${token}`)
      .send(figureData)
      .end((err, res) => {
        expect(res.status).to.eq(201)
        done()
      })
  })

  it('should return the created figure', done => {
    api
      .post('/api/figures')
      .set('Authorization', `Bearer ${token}`)
      .send(figureData)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        expect(res.body).to.include.keys([
          '_id',
          'name',
          'oldNorse',
          'associatedWith',
          'home'
        ])
        done()
      })
  })

  it('should return the correct data', done => {
    api
      .post('/api/figures')
      .set('Authorization', `Bearer ${token}`)
      .send(figureData)
      .end((err, res) => {
        expect(res.body.name).to.eq(figureData.name)
        expect(res.body.oldNorse).to.eq(figureData.oldNorse)
        expect(res.body.associatedWith).to.deep.eq(figureData.associatedWith)
        expect(res.body.home).to.eq(figureData.home)
        done()
      })
  })
})
