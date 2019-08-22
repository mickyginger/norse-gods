import React from 'react'
import { connect } from 'react-redux'
import Form from './Form'
import { postFigure, updateFormData } from '../../actions/figures'

const New = ({ updateFormData, postFigure, formData, errors }) => {

  function handleChange(e){
    formData = { ...formData, [e.target.name]: e.target.value }
    errors = { ...errors, [e.target.name]: '' }
    updateFormData(formData, errors)
  }

  function handleSubmit(e){
    e.preventDefault()
    postFigure(formData)
  }

  return(
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half-desktop is-two-thirds-tablet">
            <Form
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              data={formData}
              errors={errors}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

const mapStateToProps = state => {
  return {
    formData: state.figures.formData,
    errors: state.figures.errors
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postFigure: (formData) => dispatch(postFigure(formData)),
    updateFormData: (formData, errors) => dispatch(updateFormData(formData, errors))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(New)
