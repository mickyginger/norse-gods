import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/auth'
import { toggleNavbar } from '../../actions/navbar'

const Navbar = ({ isAuthenticated, logout, toggleNavbar, navbarIsOpen }) => {

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            Home
          </Link>

          <a
            role="button"
            className={`navbar-burger ${navbarIsOpen ? 'is-active' : ''}`}
            onClick={toggleNavbar}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>

        </div>

        <div className={`navbar-menu ${navbarIsOpen ? 'is-active' : ''}`}>
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

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    navbarIsOpen: state.navbarIsOpen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logoutUser()),
    toggleNavbar: () => dispatch(toggleNavbar())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar)
