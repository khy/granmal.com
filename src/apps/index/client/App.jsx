var React = require('react')
var ReactDom = require('react-dom')
var _map = require('lodash/collection/map')

require("./app.scss")

class App extends React.Component {

  render() {
    const appData = [
      {
        key: 'budget',
        name: 'Budget',
        description: 'Personal finances for obsessive compulsives.',
      },
      {
        key: 'haikunst',
        name: 'Haikunst',
        description: 'Like Twitter, but with haikus.',
      },
    ]

    const cards = appData.map( app => {
      return (
        <div className="card-app-link" key={app.key}>
          <div className="card-block">
            <a href="/{app.key}">
              <h5 className="card-title">{app.name}</h5>
              <p className="card-subtitle text-muted">{app.description}</p>
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
          {cards}
        </div>
      </div>
    )
  }

}

ReactDom.render(<App/>, document.querySelector('#app'))
