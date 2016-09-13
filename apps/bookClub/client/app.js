import React from 'react'
import { render } from 'react-dom'
import { browserHistory, IndexRoute, Router, Route } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { connect, Provider } from 'react-redux'

import reducer from 'bookClub/client/reducer'
import Container from 'bookClub/client/components/Container'
import Index from 'bookClub/client/components/Index'
import ShowBook from 'bookClub/client/components/ShowBook'
import ShowDogEar from 'bookClub/client/components/ShowDogEar'

require("./app.scss")

const store = applyMiddleware(
  thunkMiddleware//, createLogger()
)(createStore)(reducer, window.__INITIAL_STATE__)

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/book-club" component={Container}>
        <IndexRoute component={Index} />
        <Route path="books/:title" component={ShowBook} />
        <Route path="dogEars/:guid" component={ShowDogEar} />
      </Route>
    </Router>
  </Provider>,
  document.querySelector('#app')
)
