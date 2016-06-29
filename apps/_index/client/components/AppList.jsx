import React from 'react'

import { apps, betaApps } from '_index/client/app'

export default class AppList extends React.Component {

  render() {
    const appCards = (apps, header) => apps.map( app => {
      let headerTag

      if (apps.length > 0 && header) {
        headerTag = <h2>{header}</h2>
      }

      return (
        <div>
          {headerTag}

          <div className="card-app-link" key={app.key}>
            <div className="card-block">
              <a href={"/" + app.key}>
                <h5 className="card-title">{app.name}</h5>
                <p className="card-subtitle text-muted">{app.description}</p>
              </a>
            </div>
          </div>
        </div>
      )
    })

    return (
      <div>
        {appCards(apps)}
        {appCards(betaApps, 'Beta')}
      </div>
    )
  }

}
