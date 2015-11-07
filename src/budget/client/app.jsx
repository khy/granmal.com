var React = require('react')
var ReactDom = require('react-dom')

var Overview = require('./Overview')

require("./app.scss")

class App extends React.Component {

  render() {
    return (<Overview />)
  }

}

ReactDom.render(<App/>, document.querySelector('#app'))
