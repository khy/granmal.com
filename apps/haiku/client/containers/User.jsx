import React from 'react'
import { connect } from 'react-redux'

import { showModal } from 'client/actions/modal'
import { DummyCard } from 'client/components/bootstrap/dummyCard'
import { SecondaryButton } from 'client/components/bootstrap/button'

import {
  fetchUserHaikus, fetchMoreUserHaikus, likeHaiku, unlikeHaiku,
  showNewHaikuModal
} from 'haiku/client/actions'

import HaikuCard from 'haiku/client/components/HaikuCard'
import { MoreButton, LoadingMoreButton } from 'haiku/client/components/moreButton'

class User extends React.Component {

  constructor(props) {
    super(props)
    this.reply = this.reply.bind(this)
    this.like = this.like.bind(this)
    this.unlike = this.unlike.bind(this)
    this.fetchMore = this.fetchMore.bind(this)
  }

  componentWillMount() {
    this.props.dispatch(fetchUserHaikus(this.props.params.handle))
  }

  componentWillReceiveProps(newProps) {
    newProps.dispatch(fetchUserHaikus(newProps.params.handle))
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
    this.props.dispatch(fetchMoreUserHaikus())
  }

  render() {
    const haikus = this.props.app.user.haikus
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

    const title = haikus.haikus[0] ? haikus.haikus[0].createdBy.name : this.props.params.handle

    return (
      <div className="container">
        <h2 className="user-title">{title}</h2>

        {haikuCards}
        {moreButton}
      </div>
    )
  }

}

export default connect(state => state)(User)
