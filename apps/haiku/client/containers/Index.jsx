import React from 'react'
import { connect } from 'react-redux'

import { fetchIndexHaikus } from 'haiku/client/actions'

class Index extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchIndexHaikus())
  }

  componentWillReceiveProps(newProps) {
    newProps.dispatch(fetchIndexHaikus())
  }

  render() {
    const haikus = this.props.app.index.haikus.haikus.map((haiku) => {
      return (
        <div className="card" key={haiku.guid}>
          <div className="card-block">
            <p className="card-text">{haiku.lines[0]}</p>
            <p className="card-text">{haiku.lines[1]}</p>
            <p className="card-text">{haiku.lines[2]}</p>
          </div>
        </div>
      )
    })

    return (
      <div>
        <div className="container">
          {haikus}
        </div>
      </div>
    )
  }

}

export default connect(state => state)(Index)
