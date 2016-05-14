import React from 'react'
import { connect } from 'react-redux'

import { showModal } from 'client/actions/modal'

import { formatHaikuListDate } from 'haiku/client/lib/date'
import { fetchIndexHaikus } from 'haiku/client/actions'

class Index extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchIndexHaikus())
  }

  componentWillReceiveProps(newProps) {
    newProps.dispatch(fetchIndexHaikus())
  }

  reply(haiku) {
    this.props.dispatch(showModal('NewHaiku', { inResponseTo: haiku }))
  }

  render() {
    const haikus = this.props.app.index.haikus.haikus.map((haiku) => {
      return (
        <div className="card" key={haiku.guid}>
          <div className="card-header">
            <a href="#">{haiku.createdBy.name}</a>
            <small className="text-muted pull-right">{formatHaikuListDate(haiku.createdAt)}</small>
          </div>

          <div className="card-block haiku-lines">
            <p className="card-text">{haiku.lines[0]}</p>
            <p className="card-text">{haiku.lines[1]}</p>
            <p className="card-text">{haiku.lines[2]}</p>
          </div>

          <div className="card-block haiku-actions">
            <a href="#" onClick={this.reply.bind(this, haiku)} className="card-link">Reply</a>
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
