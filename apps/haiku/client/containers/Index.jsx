import React from 'react'
import { connect } from 'react-redux'

import { showModal } from 'client/actions/modal'
import { DummyCard } from 'client/components/bootstrap/dummyCard'

import {
  fetchIndexHaikus, fetchMoreIndexHaikus, likeHaiku, unlikeHaiku,
  showNewHaikuModal
} from 'haiku/client/actions'

import HaikuCard from 'haiku/client/components/HaikuCard'
import { MoreButton, LoadingMoreButton } from 'haiku/client/components/moreButton'

class Index extends React.Component {

  constructor(props) {
    super(props)
    this.reply = this.reply.bind(this)
    this.like = this.like.bind(this)
    this.unlike = this.unlike.bind(this)
  }

  componentWillMount() {
    this.props.dispatch(fetchIndexHaikus())
  }

  componentWillReceiveProps(newProps) {
    newProps.dispatch(fetchIndexHaikus())
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

  fetchMore() {
    this.props.dispatch(fetchMoreIndexHaikus())
  }

  render() {
    const haikus = this.props.app.index.haikus
    let haikuCards

    if (haikus.isPending && haikus.haikus.length == 0) {
      haikuCards = <div>
        <DummyCard key="dummyCard1" />
        <DummyCard key="dummyCard2" />
        <DummyCard key="dummyCard3" />
      </div>
    } else {
      haikuCards = haikus.haikus.map((haiku) => {
        return <HaikuCard
          key={haiku.guid}
          haiku={haiku}
          onReply={this.reply}
          onLike={this.like}
          onUnlike={this.unlike}
        />
      })
    }

    let moreButton

    if (haikus.isPending) {
      if (haikus.haikus.length > 0) {
        moreButton = <LoadingMoreButton />
      }
    } else if (!haikus.isLastPage) {
      moreButton = <MoreButton onClick={this.fetchMore.bind(this)} />
    }

    return (
      <div>
        {haikuCards}
        {moreButton}
      </div>
    )
  }

}

export default connect(state => state)(Index)
