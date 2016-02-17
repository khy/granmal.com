import React from 'react'
import { connect } from 'react-redux'

import Navbar from 'client/components/nav/Navbar'

import NavMenu from './Modal/NavMenu'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {navMenuToggled: false}
  }

  showNavMenu() {
    this.setState({navMenuToggled: true})
  }

  hideNavMenu() {
    this.setState({navMenuToggled: false})
  }

  logOut() {
    console.log("LOG OUT")
  }

  render() {
    const apps = [
      {
        key: 'budget',
        name: 'Budget',
        description: 'Personal finances for obsessive compulsives.',
      },
    ]

    let modal

    if (this.state.navMenuToggled) {
      modal = <NavMenu
        account={this.props.auth.account}
        onLogOut={this.logOut.bind(this)}
        onClose={this.hideNavMenu.bind(this)}
      />
    }

    const cards = apps.map( app => {
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
        <Navbar title="Gran Mal" titleUrl="/" onMenuClick={this.showNavMenu.bind(this)} />

        <div className="container">
          {cards}
        </div>

        {modal}
      </div>
    )
  }

}

export default connect((state) => state)(App)
