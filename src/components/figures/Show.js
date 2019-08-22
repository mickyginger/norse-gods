import React from 'react'
import { connect } from 'react-redux'
import { getFigure, deleteFigure } from '../../actions/figures'
import Auth from '../../lib/Auth'

class Show extends React.Component {
  constructor(){
    super()

    this.handleDelete = this.handleDelete.bind(this)
    this.canModify = this.canModify.bind(this)
  }
  componentDidMount(){
    this.props.getFigure()
  }

  handleDelete(){
    this.props.deleteFigure()
  }

  canModify() {
    return Auth.isAuthenticated() && Auth.getPayload().sub === this.props.figure.createdBy

  }

  render(){
    if (!this.props.figure) return <h1> Loading...</h1>

    return(
      <section className="section" id="figure-show">
        <div className="columns">
          <div className="column is-two-fifths-desktop is-half-tablet is-full-mobile">
            <figure className="image">
              <img src={this.props.figure.image} alt={this.props.figure.name} />
            </figure>
          </div>
          <div className="column is-two-fifths-desktop is-half-tablet is-full-mobile">
            <div className="show-content">
              <h2 className="subtitle is-4 show" id="name-show">{this.props.figure.name}</h2>
              <h2 className="subtitle is-5 show" id="old-norse-show">{this.props.figure.oldNorse}</h2>
              {this.canModify() && <button onClick={this.handleDelete}>DELETE</button>}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    figure: state.figures.data[ownProps.match.params.id]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getFigure: () => dispatch(getFigure(ownProps.match.params.id)),
    deleteFigure: () => dispatch(deleteFigure(ownProps.match.params.id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps

)(Show)
