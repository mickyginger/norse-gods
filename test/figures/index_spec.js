/* global api, describe, it, expect, beforeEach, afterEach */

const Figure = require('../../models/Figure')

const figureData = require('../../db/data/figures')

describe('GET /figures', () => {
  beforeEach(done => {
    Figure.create(figureData)
      .then(() => done())
  })

  afterEach(done => {
    Figure.remove({})
      .then(() => done())
  })

  it('should return a 200 response', done => {
    api
      .get('/api/figures')
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an array of figures', done => {
    api
      .get('/api/figures')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        res.body.forEach(figure => {
          expect(figure).to.include.keys([
            '_id',
            'name',
            'oldNorse',
            'associatedWith',
            'home'
          ])
        })
        done()
      })
  })

  it('should return the correct data types', done => {
    api
      .get('/api/figures')
      .end((err, res) => {
        res.body.forEach(figure => {

          expect(figure.name).to.be.a('string')
          expect(figure.oldNorse).to.be.a('string')
          expect(figure.associatedWith).to.be.an('array')
          expect(figure.home).to.be.a('string')
        })
        done()
      })
  })
})
