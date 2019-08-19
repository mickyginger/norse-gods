/* global api, describe, it, expect, beforeEach, afterEach */

const Figure = require('../../models/Figure')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')
const figureData = require('../../db/data/figures')

const userData = {
  username: 'test',
  email: 'test@test.test',
  password: 'test',
  passwordConfirmation: 'test'
}


describe('DELETE /figures/:id', () => {

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
      .delete(`/api/figures/${figure._id}`)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 204 response with a token', done => {
    api
      .delete(`/api/figures/${figure._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(204)
        done()
      })
  })

  it('should actually delete the figure', done => {
    api
      .delete(`/api/figures/${figure._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end(() => {
        Figure.findById(figure._id)
          .then(figure => {
            expect(figure).to.not.exist
            done()
          })
      })
  })

})
