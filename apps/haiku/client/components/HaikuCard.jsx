import React from 'react'
import { Link, browserHistory } from 'react-router'

import { formatHaikuListDate } from 'haiku/client/lib/date'

export default class HaikuCard extends React.Component {

  reply(haiku, event) {
    event.preventDefault()
    this.props.onReply(haiku)
  }

  get replyCount() {
    const haiku = this.props.haiku

    if (haiku) {
      if (haiku.responses) {
        return haiku.responses.length
      } else if (haiku.responseGuids) {
        return haiku.responseGuids.length
      }
    }

    return 0
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
    browserHistory.push(`/haiku/${haiku.guid}`)
  }

  render() {
    const haiku = this.props.haiku
    const likeCount = (haiku && haiku.likeCount) ? haiku.likeCount : 0

    let likeLink

    if (haiku.likedByUser) {
      likeLink = (
        <a href="#" onClick={this.unlike.bind(this, haiku)} className="card-link">
          <i className="fa fa-heart card-link-action" aria-hidden="true"></i>
          <span className="sr-only card-link-action">Like</span>
          <span className="reply-count">{`(${likeCount})`}</span>
        </a>
      )
    } else {
      likeLink = (
        <a href="#" onClick={this.like.bind(this, haiku)} className="card-link">
          <i className="fa fa-heart-o card-link-action" aria-hidden="true"></i>
          <span className="sr-only card-link-action">Like</span>
          <span className="reply-count">{`(${likeCount})`}</span>
        </a>
      )
    }

    return (
      <div className="card">
        <div className="card-header">
          <Link to={`/haiku/user/${haiku.createdBy.handle}`}>{haiku.createdBy.name}</Link>
          <small className="text-muted pull-xs-right">{formatHaikuListDate(haiku.createdAt)}</small>
        </div>

        <div className="card-block haiku-lines" onClick={this.show.bind(this, haiku)}>
          <p className="card-text">{haiku.lines[0]}</p>
          <p className="card-text">{haiku.lines[1]}</p>
          <p className="card-text">{haiku.lines[2]}</p>
        </div>

        <div className="card-block haiku-actions">
          <a href="#" onClick={this.reply.bind(this, haiku)} className="card-link">
            <i className="fa fa-reply card-link-action" aria-hidden="true"></i>
            <span className="sr-only card-link-action">Reply</span>
            <span className="reply-count">{`(${this.replyCount})`}</span>
          </a>
          {likeLink}
        </div>
      </div>
    )
  }

}

HaikuCard.propTypes = {
  onReply: React.PropTypes.func.isRequired,
  onLike: React.PropTypes.func.isRequired,
  onUnlike: React.PropTypes.func.isRequired,
  haiku: React.PropTypes.object,
}
