var React = require('react')
var ReactDom = require('react-dom')
import {createStore} from 'redux'

import budget from './reducer'
var Overview = require('./Overview')

require("./app.scss")

const store = createStore(budget)

console.log(store.getState())

class App extends React.Component {

  render() {
    return (<Overview />)
  }

}

ReactDom.render(<App/>, document.querySelector('#app'))
