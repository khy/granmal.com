import React from 'react'
import { Link } from 'react-router'

import { formatHaikuListDate } from 'haiku/client/lib/date'

export default class HaikuCard extends React.Component {

  reply(haiku, event) {
    event.preventDefault()
    this.props.onReply(haiku)
  }

  render() {
    const haiku = this.props.haiku

    return (
      <div className="card">
        <div className="card-header">
          <Link to={`/haiku/${haiku.createdBy.handle}`}>{haiku.createdBy.name}</Link>
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
  }

}

HaikuCard.propTypes = {
  onReply: React.PropTypes.func.isRequired,
  haiku: React.PropTypes.object,
}
