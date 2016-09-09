import React from 'react'
import { browserHistory, Link } from 'react-router'
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
        <span> of</span> <Link to={`/book-club/books/${note.edition.title}`}>{note.edition.title}</Link> by <b>{note.edition.authors[0]}</b>
      </span>
    )
  }

  let clickableClass

  if (props.clickable) {
    clickableClass = "note-card-clickable"
  }

  function onClick(event) {
    if (props.clickable) {
      event.preventDefault()
      browserHistory.push(`/book-club/notes/${note.guid}`)
    }
  }

  return <Card className={["note-card", clickableClass].join(" ")} onClick={onClick}>
    <CardBlock>
      <span dangerouslySetInnerHTML={markup} />
    </CardBlock>
    <CardBlock className="note-details">
       {noteDetail}
       {bookDetail}
    </CardBlock>
  </Card>

}
