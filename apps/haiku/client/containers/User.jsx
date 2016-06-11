import React from 'react'
import { connect } from 'react-redux'

import { showModal } from 'client/actions/modal'

import HaikuCard from 'haiku/client/components/HaikuCard'
import { fetchUserHaikus, likeHaiku, unlikeHaiku, showNewHaikuModal } from 'haiku/client/actions'

class User extends React.Component {

  constructor(props) {
    super(props)
    this.reply = this.reply.bind(this)
    this.like = this.like.bind(this)
    this.unlike = this.unlike.bind(this)
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

  render() {
    const haikus = this.props.app.user.haikus.haikus

    const haikuCards = haikus.map((haiku) => {
      return <HaikuCard
        key={haiku.guid}
        haiku={haiku}
        onReply={this.reply}
        onLike={this.like}
        onUnlike={this.unlike}
      />
    })

    const title = haikus[0] ? haikus[0].createdBy.name : this.props.params.handle

    return (
      <div className="container">
        <h2 className="user-title">{title}</h2>

        {haikuCards}
      </div>
    )
  }

}

export default connect(state => state)(User)
