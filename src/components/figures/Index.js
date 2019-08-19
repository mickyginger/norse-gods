import React from 'react'
import axios from 'axios'

class Index extends React.Component {
  constructor(){
    super()

    this.state = {
      figures: []
    }
  }

  componentDidMount(){
    axios('/api/figures')
      .then(res => this.setState({ figures: res.data }))
  }

  render(){
    return(
      <section className="section">
        <div className="container">
          <div className="container columns ">
            <div className="columns is-multiline">
              {this.state.figures.map(figure => <div key={figure._id} className="column is-one-fifth-desktop is-one-third-tablet" >
                <h1>{figure.name}</h1>
                <h2>{figure.oldNorse}</h2>
              </div>)}


            </div>
          </div>
        </div>
      </section>
    )

  }

}

export default Index
