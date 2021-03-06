import React, { Component } from 'react'
import './App.css'

import { Route, Switch } from 'react-router-dom'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'

import Login from './containers/Login'
import Signup from './containers/Signup'
import Dashboard from './containers/Dashboard'
import Search from './containers/Search'
import AppHeader from './containers/AppHeader'
import UserPage from './containers/UserPage'

import reducers from './reducers'

const history = createHistory()
const middleware = routerMiddleware(history)
const loggerMiddleware = createLogger()

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(
    thunkMiddleware,
    middleware,
    loggerMiddleware
  )
)

class App extends Component {
  render () {
    return (
      <div>
        <AppHeader />
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/search' component={Search} />
          <Route exact path='/user/:userId' component={UserPage} />
          <Route path='/' component={Dashboard} />
          <Route component={Dashboard} />
        </Switch>
      </div>
    )
  }
}

const AllApp = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  )
}

export default AllApp
