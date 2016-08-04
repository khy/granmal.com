import React from 'react'
import { connect } from 'react-redux'
import Remarkable from 'remarkable'

import { DummyCard } from 'client/components/bootstrap/dummyCard'
import { fetchNoteForShowNote } from 'bookClub/client/actions'
import { Card, CardBlock } from 'client/components/bootstrap/card'

const md = new Remarkable

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
      const markup = { __html: md.render(note.content) }

      card = <Card key={note.guid} className="note-card">
        <CardBlock>
          <span dangerouslySetInnerHTML={markup} />
        </CardBlock>
      </Card>
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
