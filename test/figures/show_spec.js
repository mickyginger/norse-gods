/* global api, describe, it, expect, beforeEach */

const Figure = require('../../models/Figure')

const figureData = require('../../db/data/figures')


describe('GET /figures/:id', () => {

  let figure

  beforeEach(done => {
    Figure.create(figureData)
      .then(figures => {
        figure = figures[0]
        done()
      })
  })

  it('should return a 200 response', done => {
    api
      .get(`/api/figures/${figure._id}`)
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return a figure', done => {
    api
      .get(`/api/figures/${figure._id}`)
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

  it('should return the correct data type', done => {
    api
      .get(`/api/figures/${figure._id}`)
      .end((err, res) => {
        expect(res.body.name).to.be.a('string')
        expect(res.body.oldNorse).to.be.a('string')
        expect(res.body.associatedWith).to.be.a('array')
        expect(res.body.home).to.be.a('string')
        done()
      })
  })
})
