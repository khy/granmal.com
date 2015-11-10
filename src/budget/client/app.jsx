import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'

import reducer from './reducer'
import Overview from './Overview'

require("./app.scss")

const store = applyMiddleware(thunkMiddleware)(createStore)(reducer)

render(
  <Provider store={store}>
    <Overview />
  </Provider>,
  document.querySelector('#app')
)
