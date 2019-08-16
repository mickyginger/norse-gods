import React from 'react'
import ReactDOM from 'react-dom'

import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'

import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Home from './components/pages/Home'

import Navbar from './components/common/Navbar'

import 'react-toastify/dist/ReactToastify.css'
import './style.scss'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
)

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>

          <Navbar />
          <ToastContainer position="bottom-right" hideProgressBar={true} />

          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
