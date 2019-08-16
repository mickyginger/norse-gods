/* global api, describe, it, expect, beforeEach, afterEach */

const Figure = require('../../models/Figure')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')

const figureData = require('../../db/data/figures')

const testData = {
  name: 'Thor',
  oldNorse: 'Þórr',
  associatedWith: ['strength', 'hammers'],
  home: 'Asgard'
}

describe('PUT /figures/:id', () => {
  let figure = null
  const token = jwt.sign({ sub: 123 }, secret, { expiresIn: '6h' })

  beforeEach(done => {
    Figure.create(figureData)
      .then(figures => {
        figure = figures[0]
        done()
      })
  })

  afterEach(done => {
    Figure.remove({})
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
