import React from 'react'
import { Link, browserHistory } from 'react-router'
import _get from 'lodash/get'

import { Icon } from 'client/components/fontAwesome'
import { formatHaikuListDate } from 'shiki/client/lib/date'

export default class HaikuCard extends React.Component {

  respond(haiku, event) {
    event.preventDefault()
    this.props.onRespond(haiku)
  }

  like(haiku, event) {
    event.preventDefault()
    this.props.onLike(haiku)
  }

  unlike(haiku, event) {
    event.preventDefault()
    this.props.onUnlike(haiku)
  }

  show(haiku, event) {
    event.preventDefault()
    browserHistory.push(`/shiki/haiku/${haiku.guid}`)
  }

  render() {
    const haiku = this.props.haiku
    const likeCount = (haiku && haiku.likeCount) ? haiku.likeCount : 0

    let likeLink

    if (haiku.likedByUser) {
      likeLink = (
        <a href="#" onClick={this.unlike.bind(this, haiku)} className="card-link">
          <Icon name="heart" srText="Like" className="card-link-action" />
          <span>{`(${likeCount})`}</span>
        </a>
      )
    } else {
      likeLink = (
        <a href="#" onClick={this.like.bind(this, haiku)} className="card-link">
          <Icon name="heart-o" srText="Unlike" className="card-link-action" />
          <span>{`(${likeCount})`}</span>
        </a>
      )
    }

    let attribution

    if (haiku.attribution) {
      attribution = <p className="attribution">- {haiku.attribution}</p>
    }

    return (
      <div className="card">
        <div className="card-header">
          <Link to={`/shiki/user/${haiku.createdBy.handle}`}>{haiku.createdBy.name}</Link>
          <small className="text-muted float-xs-right">{formatHaikuListDate(haiku.createdAt)}</small>
        </div>

        <div className="card-block haiku-lines" onClick={this.show.bind(this, haiku)}>
          <p className="card-text">{haiku.lines[0]}</p>
          <p className="card-text">{haiku.lines[1]}</p>
          <p className="card-text">{haiku.lines[2]}</p>
          {attribution}
      </div>

        <div className="card-block haiku-actions">
          <a href="#" onClick={this.respond.bind(this, haiku)} className="card-link">
            <Icon name="reply" srText="Respond" className="card-link-action" />
            <span>{`(${_get(this.props.haiku, 'responseCount', 0)})`}</span>
          </a>
          {likeLink}
        </div>
      </div>
    )
  }

}

HaikuCard.propTypes = {
  onRespond: React.PropTypes.func.isRequired,
  onLike: React.PropTypes.func.isRequired,
  onUnlike: React.PropTypes.func.isRequired,
  haiku: React.PropTypes.object,
}
