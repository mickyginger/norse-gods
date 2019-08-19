import React from 'react'
import ReactDOM from 'react-dom'

import SecureRoute from './components/common/SecureRoute'

import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import history from './history'

import { Router, Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Register from './components/auth/Register'
import Login from './components/auth/Login'

import FiguresShow from './components/figures/Show'
import FiguresNew from './components/figures/New'
import Home from './components/pages/Home'
import FiguresIndex from './components/figures/Index'

import Navbar from './components/common/Navbar'
import Auth from './lib/Auth'

import 'react-toastify/dist/ReactToastify.css'

import 'bulma'
import './style.scss'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
)

import { authSuccess } from './actions/auth'

class App extends React.Component {

  componentDidMount() {
    const token = Auth.getToken()

    if(token) store.dispatch(authSuccess(token))
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>

          <Navbar />
          <ToastContainer position="bottom-right" hideProgressBar={true} />

          <Switch>
            <SecureRoute path="/figures/new" component={FiguresNew} />
            <Route path="/figures/:id" component={FiguresShow} />
            <Route path="/figures" component={FiguresIndex} />
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
