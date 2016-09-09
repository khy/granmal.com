import React from 'react'
import { Link } from 'react-router'
import Remarkable from 'remarkable'

import { Card, CardBlock } from 'client/components/bootstrap/card'

const md = new Remarkable

export default function NoteCard(props) {

  const note = props.note
  const markup = { __html: md.render(note.content) }

  const noteDetail = (
    <span>
      <a href="#">{note.createdBy.user.name}</a> on <b>p.{note.pageNumber} (of {note.edition.pageCount})</b>
    </span>
  )

  let bookDetail

  if (!props.book) {
    bookDetail = (
      <span>
        of <Link to={`/book-club/books/${note.edition.title}`}>{note.edition.title}</Link> by <b>{note.edition.authors[0]}</b>
      </span>
    )
  }

  return <Card className="note-card">
    <CardBlock>
      <span dangerouslySetInnerHTML={markup} />
    </CardBlock>
    <CardBlock className="note-details">
       {noteDetail}
       {bookDetail}
    </CardBlock>
  </Card>

}
