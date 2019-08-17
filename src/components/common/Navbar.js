import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/auth'

class Navbar extends React.Component {

  constructor() {
    super()

    this.state = {
      navbarOpen: false
    }

    this.toggleNavbar = this.toggleNavbar.bind(this)
  }

  toggleNavbar() {
    this.setState({ navbarOpen: !this.state.navbarOpen })
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ navbarOpen: false })
    }
  }

  render(){
    const { isAuthenticated, logout } = this.props
    return (
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              Home
            </Link>

            <a
              role="button"
              className={`navbar-burger ${this.state.navbarOpen ? 'is-active' : ''}`}
              onClick={this.toggleNavbar}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>

          </div>

          <div className={`navbar-menu ${this.state.navbarOpen ? 'is-active' : ''}`}>
            <div className="navbar-end">
              {!isAuthenticated && <Link to="/register" className="navbar-item">Register</Link>}
              {!isAuthenticated && <Link to="/login" className="navbar-item">Login</Link>}
              {isAuthenticated && <a onClick={logout} className="navbar-item">Logout</a>}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logoutUser())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Navbar))
