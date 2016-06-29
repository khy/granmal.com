import React from 'react'
import { connect } from 'react-redux'

import { showModal } from 'client/actions/modal'
import { DummyCard } from 'client/components/bootstrap/dummyCard'

import {
  fetchHaiku, likeHaiku, unlikeHaiku, showNewHaikuModal, fetchMoreHaikuResponses
} from 'shiki/client/actions'

import HaikuCard from 'shiki/client/components/HaikuCard'
import { MoreButton, LoadingMoreButton } from 'shiki/client/components/moreButton'

class Show extends React.Component {

  constructor(props) {
    super(props)
    this.respond = this.respond.bind(this)
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

  respond(haiku) {
    this.props.dispatch(showNewHaikuModal(haiku))
  }

  like(haiku) {
    this.props.dispatch(likeHaiku(haiku))
  }

  unlike(haiku) {
    this.props.dispatch(unlikeHaiku(haiku))
  }

  fetchMore() {
    this.props.dispatch(fetchMoreHaikuResponses())
  }

  render() {
    const show = this.props.show
    const haiku = show.haiku
    let card

    if (show.isPending && !haiku) {
      card = <DummyCard />
    } else if (haiku) {
      card = <HaikuCard
        key={haiku.guid}
        haiku={haiku}
        onRespond={this.respond}
        onLike={this.like}
        onUnlike={this.unlike}
      />
    }

    let inResponseToSection

    if (haiku && haiku.inResponseTo) {
      inResponseToSection = <div className="show-section">
        <h4>Responding To</h4>
        <HaikuCard
          key={haiku.inResponseTo.guid}
          haiku={haiku.inResponseTo}
          onRespond={this.respond}
          onLike={this.like}
          onUnlike={this.unlike}
        />
      </div>
    }

    let responsesSection

    if (show.responses.haikus.length > 0) {
      const responseCards = show.responses.haikus.map((response) => {
        return <HaikuCard
          key={response.guid}
          haiku={response}
          onRespond={this.respond}
          onLike={this.like}
          onUnlike={this.unlike}
        />
      })

      let moreButton

      if (show.responses.isPending) {
        moreButton = <LoadingMoreButton />
      } else if (!show.responses.isLastPage) {
        moreButton = <MoreButton onClick={this.fetchMore.bind(this)} />
      }

      responsesSection = <div className="show-section">
        <h4>Responses</h4>
        {responseCards}
        {moreButton}
      </div>
    }

    return (
      <div>
        {card}
        {inResponseToSection}
        {responsesSection}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    show: state.app.show
  }
}

export default connect(mapStateToProps)(Show)
