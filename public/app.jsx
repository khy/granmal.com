var React = require('react')
var ReactDom = require('react-dom')
var model = require('./model.js')

class H1Manager extends React.Component {

  constructor() {
    super()
    this.state = {apps: {}}
  }

  componentWillMount() {
    this.update()
  }

  render() {
    var appNames = Object.keys(this.state.apps).map(idx => {
      return <li key={idx}>{this.state.apps[idx].name}</li>
    })

    return (
      <div>
        <h1>Gran Mal</h1>
        <ul>{appNames}</ul>
      </div>
    )
  }

  update() {
    model.getValue(['apps', 'length'])
      .then(length => model.get(['apps', {from: 0, to: length-1}, 'name']))
      .then(response => this.setState({apps: response.json.apps}))
  }

}

ReactDom.render(<H1Manager/>, document.querySelector('#app'))
