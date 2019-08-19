/* global api, describe, it, expect, beforeEach, afterEach */

const Figure = require('../../models/Figure')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')

const figureData = require('../../db/data/figures')

const testData = {
  name: 'Thor',
  oldNorse: 'Þórr',
  associatedWith: ['strength', 'hammers'],
  home: 'Asgard'
}

const userData = {
  username: 'test',
  email: 'test@test.test',
  password: 'test',
  passwordConfirmation: 'test'
}

describe('PUT /figures/:id', () => {
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
      .put(`/api/figures/${figure._id}`)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 200 response with a token', done => {
    api
      .put(`/api/figures/${figure._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return a figure', done => {
    api
      .put(`/api/figures/${figure._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
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
      .put(`/api/figures/${figure._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.body.name).to.eq(testData.name)
        expect(res.body.oldNorse).to.eq(testData.oldNorse)
        expect(res.body.associatedWith).to.deep.eq(testData.associatedWith)
        expect(res.body.home).to.eq(testData.home)
        done()
      })
  })
})
