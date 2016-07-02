import React from 'react'

import { apps, betaApps } from '_index/client/app'

export default class AppList extends React.Component {

  goToApp(key) {
    window.location = "/" + key
  }

  render() {
    const appCards = (apps) => apps.map( app => {
      return (
        <div className="card-app-link" onClick={this.goToApp.bind(this, app.key)} key={app.key}>
          <div className="card-block">
            <h4 className="card-title">{app.name}</h4>
            <p className="card-text">{app.description}</p>
          </div>
        </div>
      )
    })

    return (
      <div className="card-columns">
        <div className="card text-xs-center" key="title">
          <img className="card-img img-fluid" src="bad-ass.jpg" />
          <div className="card-img-overlay"></div>
        </div>

        {appCards(apps)}
      </div>
    )
  }

}
