import React from 'react'
import { connect } from 'react-redux'

import { showModal } from 'client/actions/modal'

import HaikuCard from 'haiku/client/components/HaikuCard'
import { fetchUserHaikus, likeHaiku } from 'haiku/client/actions'

class User extends React.Component {

  constructor(props) {
    super(props)
    this.reply = this.reply.bind(this)
    this.like = this.like.bind(this)
  }

  componentWillMount() {
    this.props.dispatch(fetchUserHaikus(this.props.params.handle))
  }

  reply(haiku) {
    this.props.dispatch(showModal('NewHaiku', { inResponseTo: haiku }))
  }

  like(haiku) {
    this.props.dispatch(likeHaiku(haiku))
  }

  render() {
    const haikus = this.props.app.user.haikus.haikus

    const haikuCards = haikus.map((haiku) => {
      return <HaikuCard
        key={haiku.guid}
        haiku={haiku}
        onReply={this.reply}
        onLike={this.like}
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
