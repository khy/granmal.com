import React from 'react'
import { render } from 'react-dom'
import { browserHistory, IndexRoute, Router, Route } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { connect, Provider } from 'react-redux'

import reducer from 'dogEars/client/reducer'
import Container from 'dogEars/client/components/Container'
import Index from 'dogEars/client/components/Index'
import ShowBook from 'dogEars/client/components/ShowBook'
import ShowNote from 'dogEars/client/components/ShowNote'

require("./app.scss")

const store = applyMiddleware(
  thunkMiddleware//, createLogger()
)(createStore)(reducer, window.__INITIAL_STATE__)

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/dogEars" component={Container}>
        <IndexRoute component={Index} />
        <Route path="books/:title" component={ShowBook} />
        <Route path="notes/:guid" component={ShowNote} />
      </Route>
    </Router>
  </Provider>,
  document.querySelector('#app')
)
