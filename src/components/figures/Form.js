import React from 'react'
import { withRouter } from 'react-router-dom'

const options = [
  'beauty',
  'consciousness',
  'cunning',
  'death',
  'fertility',
  'frenzy',
  'gold',
  'healing',
  'love',
  'royalty',
  'sex',
  'shapeshifting',
  'sorcery',
  'touch',
  'trickery',
  'war',
  'willpower',
  'wisdom'
]

const Form = ({ handleChange, handleSubmit, data, errors}) => {
  return (
    <section className="section">
      <div className="container is-fluid">
        <div className="formBox">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  name="name"
                  placeholder="eg: Odin"
                  onChange={handleChange}
                  value={data.name || ''}
                />
              </div>
              {errors.name && <div className="help is-danger">{errors.name}</div>}
            </div>
            <div className="field">
              <label className="label">Old Norse</label>
              <div className="control">
                <input
                  className="input"
                  name="oldNorse"
                  placeholder="eg: Óðinn"
                  onChange={handleChange}
                  value={data.oldNorse || ''}
                />
              </div>
              {errors.oldNorse && <div className="help is-danger">{errors.oldNorse}</div>}
            </div>
            <div className="field">
              <label className="label">Image</label>
              <div className="control">

                <input
                  className="input"
                  name="image"
                  placeholder="eg: https://upload.wikimedia.org/wikipedia/en/thumb/c/cb/theKinks.jpg"
                  onChange={handleChange}
                  value={data.image || ''}
                />


              </div>
              {errors.image && <div className="help is-danger">{errors.image}</div>}
            </div>
            <div className="field">
              <label className="label">Home</label>
              <div className="control">

                <input
                  className="input"
                  name="home"
                  placeholder="eg: Asgard"
                  onChange={handleChange}
                  value={data.home || ''}
                />


              </div>
              {errors.home && <div className="help is-danger">{errors.home}</div>}
            </div>
            <div className="field">
              <label className="label">Associated With</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    name="associatedWith"
                    onChange={handleChange}
                    value={data.associatedWith || ''}
                  >
                    <option value="">Please choose...</option>
                    {options.map(option =>
                      <option key={option}>{option}</option>
                    )}
                  </select>
                </div>
                {errors.associatedWith && <div className="help is-danger">{errors.associatedWith}</div>}
              </div>
            </div>


            <button className="button is-dark">Submit</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default withRouter(Form)
