import React from 'react'
import ReactDOM from 'react-dom'

import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Home from './components/pages/Home'

import Navbar from './components/common/Navbar'

import 'react-toastify/dist/ReactToastify.css'
import './style.scss'

class App extends React.Component {
  render() {
    return (
      <Router>

        <Navbar />
        <ToastContainer position="bottom-right" hideProgressBar={true} />

        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
