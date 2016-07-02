import React from 'react'
import _find from 'lodash/find'

import { apps, mainImages, layouts } from '_index/client/db'
import AppCard from '_index/client/components/AppCard'

export default class CardLayout extends React.Component {

  goToApp(key) {
    window.location = "/" + key
  }

  render() {
    var layout = layouts[0]

    const cards = layout.items.map(item => {
      switch (item.type) {
        case 'app':
          const app = _find(apps, (app) => app.key === item.key)
          return <AppCard {...app}
            key={`${item.type}-${item.key}`}
            onClick={this.goToApp.bind(this, app.key)}
          />
      }
    })

    const mainImage = _find(mainImages, (mi) => mi.key === layout.mainImageKey)

    return (
      <div className="card-columns">
        <div className="card text-xs-center" key="title">
          <img className="card-img img-fluid" src={mainImage.url} />
          <div className="card-img-overlay"></div>
        </div>

        {cards}
      </div>
    )
  }

}
