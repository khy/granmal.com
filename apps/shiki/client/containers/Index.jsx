import React from 'react'
import { connect } from 'react-redux'

import { showModal } from 'client/actions/modal'
import { DummyCard } from 'client/components/bootstrap/dummyCard'

import { fetchIndexHaikus, fetchMoreIndexHaikus } from 'shiki/client/actions'
import HaikuCard from 'shiki/client/components/HaikuCard'
import { MoreButton, LoadingMoreButton } from 'shiki/client/components/moreButton'
import { baseMapDispatchToProps } from 'shiki/client/containers/lib'

class Index extends React.Component {

  componentWillMount() {
    this.props.onFetch()
  }

  componentWillReceiveProps(newProps) {
    newProps.onFetch()
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
        return <HaikuCard {...this.props}
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

    return (
      <div>
        {haikuCards}
        {moreButton}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    haikus: state.app.index.haikus
  }
}

const mapDispatchToProps = baseMapDispatchToProps((dispatch) => {
  return {
    onFetch: () => { dispatch(fetchIndexHaikus()) },
    onFetchMore: () => { dispatch(fetchMoreIndexHaikus()) },
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
