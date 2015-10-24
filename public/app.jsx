var React = require('react')
var ReactDom = require('react-dom')

class H1Manager extends React.Component {
  render() {
    return (
      <h1>Gran Mal!</h1>
    )
  }
}

ReactDom.render(<H1Manager/>, document.querySelector('#app'))
