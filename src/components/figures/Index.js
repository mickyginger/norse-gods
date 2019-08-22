import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getFigures } from '../../actions/figures'
import { objectToArray } from '../../lib/helpers'

import Card from './Card'

class Index extends React.Component {

  componentDidMount(){
    this.props.getFigures()
  }

  render(){
    return(
      <section className="section">
        <div className="container">
          <div className="container columns ">
            <div className="columns is-multiline">
              {this.props.figures.map(figure => <div key={figure._id} className="column is-one-fifth-desktop is-one-third-tablet" >
                <Link to={`/figures/${figure._id}`}>
                  <Card {...figure} />
                </Link>
              </div>)}


            </div>
          </div>
        </div>
      </section>
    )

  }

}

const mapStateToProps = state => {
  return {
    figures: objectToArray(state.figures.data)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFigures: () => dispatch(getFigures())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
