import React from 'react'
import { connect } from 'react-redux'

import { showModal } from 'client/actions/modal'
import { DummyCard } from 'client/components/bootstrap/dummyCard'
import { SecondaryButton } from 'client/components/bootstrap/button'

import {
  fetchUserHaikus, fetchMoreUserHaikus, likeHaiku, unlikeHaiku,
  showNewHaikuModal
} from 'shiki/client/actions'

import HaikuCard from 'shiki/client/components/HaikuCard'
import { MoreButton, LoadingMoreButton } from 'shiki/client/components/moreButton'

class User extends React.Component {

  componentWillMount() {
    this.props.onFetch(this.props.params.handle)
  }

  componentWillReceiveProps(newProps) {
    newProps.onFetch(newProps.params.handle)
  }

  render() {
    const haikus = this.props.haikus
    let haikuCards

    if (haikus.isPending && haikus.haikus.length == 0) {
      haikuCards = <div>
        <DummyCard key="dummyCard1" />
        <DummyCard key="dummyCard2" />
        <DummyCard key="dummyCard3" />
      </div>
    } else {
      haikuCards = haikus.haikus.map((haiku) => {
        return <HaikuCard  {...this.props}
          key={haiku.guid}
          haiku={haiku}
        />
      })
    }

    let moreButton

    if (haikus.isPending) {
      if (haikus.haikus.length > 0) {
        moreButton = <LoadingMoreButton />
      }
    } else if (!haikus.isLastPage) {
      moreButton = <MoreButton onClick={this.props.onFetchMore} />
    }

    const title = haikus.haikus[0] ? haikus.haikus[0].createdBy.name : this.props.params.handle

    return (
      <div>
        <h2 className="user-title">{title}</h2>

        {haikuCards}
        {moreButton}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    haikus: state.app.user.haikus
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetch: (handle) => { dispatch(fetchUserHaikus(handle)) },
    onFetchMore: () => { dispatch(fetchMoreUserHaikus()) },
    onLike: (haiku) => { dispatch(likeHaiku(haiku)) },
    onRespond: (haiku) => { dispatch(showNewHaikuModal(haiku)) },
    onUnlike: (haiku) => { dispatch(unlikeHaiku(haiku)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
