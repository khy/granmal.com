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

  componentWillMount() {
    this.props.onFetch(this.props.params.guid, true)
  }

  componentWillReceiveProps(newProps) {
    newProps.onFetch(newProps.params.guid, false)
  }

  render() {
    const show = this.props.show
    const haiku = show.haiku
    let card

    if (show.isPending && !haiku) {
      card = <DummyCard />
    } else if (haiku) {
      card = <HaikuCard {...this.props}
        key={haiku.guid}
        haiku={haiku}
      />
    }

    let inResponseToSection

    if (haiku && haiku.inResponseTo) {
      inResponseToSection = <div className="show-section">
        <h4>Responding To</h4>
        <HaikuCard  {...this.props}
          key={haiku.inResponseTo.guid}
          haiku={haiku.inResponseTo}
        />
      </div>
    }

    let responsesSection

    if (show.responses.haikus.length > 0) {
      const responseCards = show.responses.haikus.map((response) => {
        return <HaikuCard  {...this.props}
          key={response.guid}
          haiku={response}
        />
      })

      let moreButton

      if (show.responses.isPending) {
        moreButton = <LoadingMoreButton />
      } else if (!show.responses.isLastPage) {
        moreButton = <MoreButton onClick={this.props.onFetchMore} />
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

const mapDispatchToProps = (dispatch) => {
  return {
    onFetch: (guid, clear) => {
      if (clear) { dispatch({ type: 'ClearShowHaiku' }) }
      dispatch(fetchHaiku(guid))
    },
    onFetchMore: () => { dispatch(fetchMoreHaikuResponses()) },
    onLike: (haiku) => { dispatch(likeHaiku(haiku)) },
    onRespond: (haiku) => { dispatch(showNewHaikuModal(haiku)) },
    onUnlike: (haiku) => { dispatch(unlikeHaiku(haiku)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Show)
