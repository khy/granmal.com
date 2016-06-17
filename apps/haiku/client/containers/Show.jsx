import React from 'react'
import { connect } from 'react-redux'

import { showModal } from 'client/actions/modal'
import { DummyCard } from 'client/components/bootstrap/dummyCard'

import {
  fetchHaiku, fetchHaikuResponses, likeHaiku, unlikeHaiku, showNewHaikuModal
} from 'haiku/client/actions'

import HaikuCard from 'haiku/client/components/HaikuCard'

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
    this.props.dispatch(fetchHaikuResponses(this.props.params.guid))
  }

  componentWillReceiveProps(newProps) {
    newProps.dispatch(fetchHaiku(newProps.params.guid))
    newProps.dispatch(fetchHaikuResponses(this.props.params.guid))
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
    const show = this.props.app.show
    const haiku = show.haiku
    let card

    if (show.isPending && !haiku) {
      card = <DummyCard />
    } else if (haiku) {
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

    if (show.responses.haikus.length > 0) {
      const responses = show.responses.haikus.map((response) => {
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
