import React from 'react'
import { browserHistory, Link } from 'react-router'
import Remarkable from 'remarkable'

import { Card, CardBlock } from 'client/components/bootstrap/card'

const md = new Remarkable

export default function DogEarCard(props) {

  const dogEar = props.dogEar
  const markup = { __html: md.render(dogEar.note) }

  const dogEarDetail = (
    <span>
      <a href="#">{dogEar.createdBy.user.name}</a> on <b>p.{dogEar.pageNumber} (of {dogEar.edition.pageCount})</b>
    </span>
  )

  let bookDetail

  if (!props.book) {
    bookDetail = (
      <span>
        <span> of</span> <Link to={`/book-club/books/${dogEar.edition.title}`}>{dogEar.edition.title}</Link> by <b>{dogEar.edition.authors[0]}</b>
      </span>
    )
  }

  let clickableClass

  if (props.clickable) {
    clickableClass = "dog-ear-card-clickable"
  }

  function onClick(event) {
    if (props.clickable) {
      event.preventDefault()
      browserHistory.push(`/book-club/dogEars/${dogEar.guid}`)
    }
  }

  return <Card className={["dog-ear-card", clickableClass].join(" ")} onClick={onClick}>
    <CardBlock>
      <span dangerouslySetInnerHTML={markup} />
    </CardBlock>
    <CardBlock className="dog-ear-details">
       {dogEarDetail}
       {bookDetail}
    </CardBlock>
  </Card>

}
