import React from 'react'
import { connect } from 'react-redux'

import { showModal } from 'client/actions/modal'
import { DummyCard } from 'client/components/bootstrap/dummyCard'

import HaikuCard from 'haiku/client/components/HaikuCard'
import { fetchIndexHaikus, likeHaiku, unlikeHaiku, showNewHaikuModal } from 'haiku/client/actions'

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

  render() {
    let haikus

    if (this.props.app.index.haikus.isPending && this.props.app.index.haikus.haikus.length == 0) {
      haikus = <div>
        <DummyCard key="dummyCard1" />
        <DummyCard key="dummyCard2" />
        <DummyCard key="dummyCard3" />
      </div>
    } else {
      haikus = this.props.app.index.haikus.haikus.map((haiku) => {
        return <HaikuCard
          key={haiku.guid}
          haiku={haiku}
          onReply={this.reply}
          onLike={this.like}
          onUnlike={this.unlike}
        />
      })
    }

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
