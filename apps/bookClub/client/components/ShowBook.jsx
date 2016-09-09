import React from 'react'
import { connect } from 'react-redux'

import { DummyCard } from 'client/components/bootstrap/dummyCard'
import { Card, CardBlock } from 'client/components/bootstrap/card'
import { fetchBookForShowBook, fetchNotesForShowBook } from 'bookClub/client/actions'
import NoteCard from 'bookClub/client/components/NoteCard'

class ShowBook extends React.Component {

  componentWillMount() {
    this.props.clearBook()
    this.load(this.props)
  }

  componentWillReceiveProps(newProps) {
    this.load(newProps)
  }

  load(props) {
    props.fetchBook(props.params.title)
    props.fetchNotes(props.params.title)
  }

  render() {
    const bookMeta = this.props.book
    const book = bookMeta.record

    let bookCard

    if (book) {
      bookCard = (
        <Card>
          <img className="card-img-top img-fluid" src={book.largeImageUrl} />
          <CardBlock>
            <h4 className="card-title">{book.title}</h4>
            <p className="card-subtitle text-muted">{book.authors[0]}</p>
          </CardBlock>
        </Card>
      )
    } else {
      bookCard = <DummyCard />
    }

    const notesMeta = this.props.notes
    const notes = notesMeta.records

    let noteCards

    if (!notesMeta.isPending) {
      noteCards = notes.map((note) => (
        <NoteCard key={note.guid} note={note} book={book} />
      ))
    }

    return (
      <div className="row">
        <div className="col-xs-12 col-sm-3">
          {bookCard}
        </div>
        <div className="col-xs-12 col-sm-9">
          {noteCards}
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return state.app.showBook
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearBook: () => {
      dispatch({ type: 'showBook.clear' })
    },
    fetchBook: (title) => {
      dispatch(fetchBookForShowBook(title))
    },
    fetchNotes: (title) => {
      dispatch(fetchNotesForShowBook(title))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowBook)
