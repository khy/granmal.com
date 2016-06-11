import React from 'react'
import { connect } from 'react-redux'

import { showModal } from 'client/actions/modal'

import HaikuCard from 'haiku/client/components/HaikuCard'
import { fetchHaiku, likeHaiku, unlikeHaiku, showNewHaikuModal } from 'haiku/client/actions'

class Show extends React.Component {

  constructor(props) {
    super(props)
    this.reply = this.reply.bind(this)
    this.like = this.like.bind(this)
    this.unlike = this.unlike.bind(this)
  }

  componentWillMount() {
    this.props.dispatch({ type: 'ClearShowHaiku' })
    this.props.dispatch(fetchHaiku(this.props.params.guid))
  }

  componentWillReceiveProps(newProps) {
    newProps.dispatch(fetchHaiku(newProps.params.guid))
  }

  reply(haiku) {
    this.props.dispatch(showNewHaikuModal(haiku))
  }

  like(haiku) {
    this.props.dispatch(likeHaiku(haiku))
  }

  unlike(haiku) {
    this.props.dispatch(unlikeHaiku(haiku))
  }

  render() {
    const haiku = this.props.app.show.haiku
    let card

    if (haiku) {
      card = <HaikuCard
        key={haiku.guid}
        haiku={haiku}
        onReply={this.reply}
        onLike={this.like}
        onUnlike={this.unlike}
      />
    }

    let inResponseToSection

    if (haiku && haiku.inResponseTo) {
      inResponseToSection = <div className="show-section">
        <h4>Replying To</h4>
        <HaikuCard
          key={haiku.inResponseTo.guid}
          haiku={haiku.inResponseTo}
          onReply={this.reply}
          onLike={this.like}
          onUnlike={this.unlike}
        />
      </div>
    }

    let responsesSection

    if (haiku && haiku.responses.length > 0) {
      const responses = haiku.responses.map((response) => {
        return <HaikuCard
          key={response.guid}
          haiku={response}
          onReply={this.reply}
          onLike={this.like}
          onUnlike={this.unlike}
        />
      })

      responsesSection = <div className="show-section">
        <h4>Replies</h4>
        {responses}
      </div>
    }

    return (
      <div className="container">
        {card}
        {inResponseToSection}
        {responsesSection}
      </div>
    )
  }

}

export default connect(state => state)(Show)
