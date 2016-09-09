import React from 'react'
import { connect } from 'react-redux'

import { DummyCard } from 'client/components/bootstrap/dummyCard'
import { Card, CardBlock } from 'client/components/bootstrap/card'
import { fetchNoteForShowNote } from 'bookClub/client/actions'
import NoteCard from 'bookClub/client/components/NoteCard'

class ShowNote extends React.Component {

  componentWillMount() {
    this.props.onFetch(this.props.params.guid)
  }

  componentWillReceiveProps(newProps) {
    newProps.onFetch(newProps.params.guid)
  }

  render() {
    const noteMeta = this.props.note
    const note = noteMeta.record
    let card

    if (note) {
      card = <NoteCard key={note.guid} note={note} />
    } else {
      card = <DummyCard />
    }

    return card
  }

}

const mapStateToProps = (state) => {
  return state.app.showNote
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetch: (guid) => {
      dispatch(fetchNoteForShowNote(guid))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowNote)
