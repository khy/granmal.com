import React from 'react'

export default class AppList extends React.Component {

  render() {
    const apps = [
      {
        key: 'shiki',
        name: 'Shiki',
        description: 'Giving everyone the power to create and share ideas and information instantly, without barriers, with haikus.'
      }
    ]

    const betaApps = [
      {
        key: 'budget',
        name: 'Budget',
        description: 'Personal finances for obsessive compulsives.',
      },
    ]

    const appCards = (apps) => apps.map( app => {
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
        {appCards(apps)}
        <h2>Beta</h2>
        {appCards(betaApps)}
      </div>
    )
  }

}
