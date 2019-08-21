import React from 'react'
import axios from 'axios'


class Show extends React.Component {
  constructor(){
    super()

    this.state = {
      figure: null
    }
  }

  componentDidMount(){
    axios.get(`/api/figures/${this.props.match.params.id}`)
      .then(res => this.setState({ figure: res.data }))
  }

  render(){
    if (!this.state.figure) return <h1> Loading...</h1>
    return(
      <section className="section" id="vinyl-show">
        <div className="columns">
          <div className="column is-two-fifths-desktop is-half-tablet is-full-mobile">
            <figure className="image">
              <img src={this.state.figure.image} alt={this.state.figure.name} />
            </figure>
          </div>
          <div className="column is-two-fifths-desktop is-half-tablet is-full-mobile">
            <div className="show-content">
              <h2 className="subtitle is-4 show" id="name-show">{this.state.figure.name}</h2>
              <h2 className="subtitle is-5 show" id="old-norse-show">{this.state.figure.oldNorse}</h2>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Show
