import React from 'react'
import { connect } from 'react-redux'
import { loginUser, updateFormData } from '../../actions/auth'

const Login = ({ updateFormData, loginUser, formData, errors }) => {

  function handleChange(e) {
    formData = { ...formData, [e.target.name]: e.target.value }
    errors = { ...errors, [e.target.name]: '' }
    updateFormData(formData, errors)
  }

  function handleSubmit(e) {
    e.preventDefault()

    loginUser(formData)
  }

  return (
    <section className="section">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="email"
                name="email"
                placeholder="eg: leela3000@planetexpress.co.nny"
                onChange={handleChange}
              />
              {errors.email && <small className="help is-danger">{errors.email}</small>}
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                name="password"
                placeholder="eg: ••••••••"
                onChange={handleChange}
              />
            </div>
            {errors.password && <small className="help is-danger">{errors.password}</small>}
          </div>

          <button className="button">Submit</button>
        </form>
      </div>
    </section>
  )
}

const mapStateToProps = state => {
  return {
    formData: state.auth.formData,
    errors: state.auth.errors
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: credentials => dispatch(loginUser(credentials)),
    updateFormData: (formData, errors) => dispatch(updateFormData(formData, errors))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
