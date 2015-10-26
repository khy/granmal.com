var React = require('react')
var ReactDom = require('react-dom')
var model = require('./model.js')

require("./stylesheets/app.scss")

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
      return (
        <div className="card-app-link">
          <div className="card-block">
            <a href={this.state.apps[idx].path}>
              <h5 className="card-title">{this.state.apps[idx].name}</h5>
              <p className="card-subtitle text-muted">{this.state.apps[idx].description}</p>
            </a>
          </div>
        </div>
      )
    })

    return (
      <div>
        <nav className="navbar navbar-light bg-faded">
          <div className="container">
            <h1 className="navbar-brand" href="#">Gran Mal</h1>
          </div>
        </nav>

        <div className="container">
          {appNames}
        </div>
      </div>
    )
  }

  update() {
    model.getValue(['apps', 'length'])
      .then(length => model.get(['apps', {from: 0, to: length-1}, ['name', 'description', 'path']]))
      .then(response => this.setState({apps: response.json.apps}))
  }

}

ReactDom.render(<H1Manager/>, document.querySelector('#app'))
