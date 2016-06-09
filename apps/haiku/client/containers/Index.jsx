import React from 'react'
import { connect } from 'react-redux'

import { showModal } from 'client/actions/modal'

import HaikuCard from 'haiku/client/components/HaikuCard'
import { fetchIndexHaikus, likeHaiku } from 'haiku/client/actions'

class Index extends React.Component {

  constructor(props) {
    super(props)
    this.reply = this.reply.bind(this)
    this.like = this.like.bind(this)
  }

  componentWillMount() {
    this.props.dispatch(fetchIndexHaikus())
  }

  componentWillReceiveProps(newProps) {
    newProps.dispatch(fetchIndexHaikus())
  }

  reply(haiku) {
    this.props.dispatch(showModal('NewHaiku', { inResponseTo: haiku }))
  }

  like(haiku) {
    this.props.dispatch(likeHaiku(haiku))
  }

  render() {
    const haikus = this.props.app.index.haikus.haikus.map((haiku) => {
      return <HaikuCard
        key={haiku.guid}
        haiku={haiku}
        onReply={this.reply}
        onLike={this.like}
      />
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
