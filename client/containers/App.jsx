var React = require('react')
var ReactDom = require('react-dom')
import Navbar from 'client/components/nav/Navbar'

require('../stylesheets/app.scss')

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
            <a href={"/" + app.key}>
              <h5 className="card-title">{app.name}</h5>
              <p className="card-subtitle text-muted">{app.description}</p>
            </a>
          </div>
        </div>
      )
    })

    return (
      <div>
        <Navbar title="Gran Mal" titleUrl="/" />

        <div className="container">
          {cards}
        </div>
      </div>
    )
  }

}

ReactDom.render(<App/>, document.querySelector('#app'))
