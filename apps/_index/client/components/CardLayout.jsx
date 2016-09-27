import React from 'react'
import _filter from 'lodash/filter'
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

    var leftCards = _filter(cards, (card, index) => index % 2 === 0)
    var rightCards = _filter(cards, (card, index) => index % 2 === 1)

    const mainImage = _find(mainImages, (mi) => mi.key === layout.mainImageKey)

    return (
      <div>
        <div className="row hidden-md-down">
          <div className="col-lg">
            <div className="card">
              <img className="card-img img-fluid" src={mainImage.url} />
            </div>
          </div>
          <div className="col-lg">
            {leftCards}
          </div>
          <div className="col-lg">
            {rightCards}
          </div>
        </div>

        <div className="hidden-lg-up">
          <div className="card">
            <img className="card-img img-fluid" src={mainImage.url} />
          </div>
          {cards}
        </div>
      </div>
    )
  }

}
